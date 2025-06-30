import axios from "axios";

console.log("VITE_API_URL:", import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // httpOnly cookie için
  maxContentLength: 10 * 1024 * 1024, // 10MB
  maxBodyLength: 10 * 1024 * 1024, // 10MB
  timeout: 30000, // 30 saniye timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export const chatAssist = (message: string) =>
  api.post("/api/auth/chat/assist", { message });
