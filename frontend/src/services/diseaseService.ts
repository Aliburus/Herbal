import api from "./api";

export const getDiseases = () => api.get("/api/diseases");
export const getDiseaseById = (id: string) => api.get(`/api/diseases/${id}`);
export const createDisease = (data: any) => api.post("/api/diseases", data);
export const updateDisease = (id: string, data: any) =>
  api.put(`/api/diseases/${id}`, data);
export const deleteDisease = (id: string) => api.delete(`/api/diseases/${id}`);
