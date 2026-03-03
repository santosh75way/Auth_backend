import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL as string;

export const http = axios.create({
  baseURL,
  withCredentials: true, // ✅ sends/receives refresh cookie
  headers: {
    "Content-Type": "application/json",
  },
});