import api from "./api";

export const getCategories = () => api.get("/api/categories");
export const getCategoryById = (id: string) => api.get(`/api/categories/${id}`);
export const createCategory = (data: any) => api.post("/api/categories", data);
export const updateCategory = (id: string, data: any) =>
  api.put(`/api/categories/${id}`, data);
export const deleteCategory = (id: string) =>
  api.delete(`/api/categories/${id}`);
