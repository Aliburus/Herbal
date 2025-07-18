import api from "./api";

export const login = (data: any) => api.post("/api/auth/login", data);
export const logout = () => api.post("/api/auth/logout");
export const getMe = () => api.get("/api/auth/me");
export const setupAdmin = (data: any) => api.post("/api/auth/setup", data);
export const register = (data: any) => api.post("/api/auth/register", data);
export const getUsers = () => api.get("/api/auth/users");
export const getUserStats = () => api.get("/api/auth/users/stats");
export const deleteUser = (id: string) => api.delete(`/api/auth/users/${id}`);
export const changePassword = (data: {
  currentPassword: string;
  newPassword?: string;
  newEmail?: string;
}) => api.post("/api/auth/change-password", data);
