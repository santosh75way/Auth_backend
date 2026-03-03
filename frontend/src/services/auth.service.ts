import { http } from "./http";

export type PublicUser = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export async function apiSignup(body: SignupRequest): Promise<PublicUser> {
  const res = await http.post<{ user: PublicUser }>("/api/auth/signup", body);
  return res.data.user;
}

export async function apiLogin(body: LoginRequest): Promise<{ user: PublicUser; accessToken: string }> {
  const res = await http.post<{ user: PublicUser; accessToken: string }>("/api/auth/login", body);
  return res.data;
}

export async function apiRefresh(): Promise<{ accessToken: string }> {
  const res = await http.post<{ accessToken: string }>("/api/auth/refresh");
  return res.data;
}

export async function apiMe(accessToken: string): Promise<PublicUser> {
  const res = await http.get<{ user: PublicUser }>("/api/auth/me", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return res.data.user;
}

export async function apiLogout(): Promise<void> {
  await http.post("/api/auth/logout");
}

export async function apiForgotPassword(email: string): Promise<{ message: string }> {
  const res = await http.post<{ message: string }>("/api/auth/forgot-password", { email });
  return res.data;
}

export async function apiResetPassword(token: string, newPassword: string): Promise<{ message: string }> {
  const res = await http.post<{ message: string }>("/api/auth/reset-password", { token, newPassword });
  return res.data;
}
