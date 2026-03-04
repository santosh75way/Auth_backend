import axios, { type AxiosError } from "axios";
import { store } from "../store";
import { clearSession, setSession } from "../store/slices/auth.slice";
import { apiRefresh } from "./auth.service";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const http = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<{ message?: string }>) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !(originalRequest as any)._retry) {
      // Don't intercept refresh token calls themselves (to prevent infinite loops)
      if (originalRequest.url?.includes("/api/auth/refresh") || originalRequest.url?.includes("/api/auth/login")) {
        const message =
          error.response?.data?.message ??
          error.message ??
          "An unexpected error occurred";
        return Promise.reject(new Error(message));
      }

      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return http(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      (originalRequest as any)._retry = true;
      isRefreshing = true;

      try {
        const { accessToken } = await apiRefresh();

        // Grab existing user from store so we don't lose them when syncing the token
        const currentUser = store.getState().auth.user;
        if (currentUser) {
          store.dispatch(setSession({ user: currentUser, accessToken }));
        }

        http.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
        originalRequest.headers["Authorization"] = "Bearer " + accessToken;

        processQueue(null, accessToken);
        return http(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        store.dispatch(clearSession());
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const message =
      error.response?.data?.message ??
      error.message ??
      "An unexpected error occurred";
    return Promise.reject(new Error(message));
  },
);