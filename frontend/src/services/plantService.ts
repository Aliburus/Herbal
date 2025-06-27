import api from "./api";
console.log("API BASE URL:", import.meta.env.VITE_API_URL);

export const getPlants = () => {
  console.log("getPlants istek adresi:", api.defaults.baseURL + "/api/plants");
  return api.get("/api/plants");
};
export const getPlantById = (id: string) => api.get(`/api/plants/${id}`);
export const createPlant = (data: any) => api.post("/api/plants", data);
export const updatePlant = (id: string, data: any) =>
  api.put(`/api/plants/${id}`, data);
export const deletePlant = (id: string) => api.delete(`/api/plants/${id}`);
export const getStats = () => api.get("/api/plants/stats");
