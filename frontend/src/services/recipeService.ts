import api from "./api";

export const getRecipes = () => api.get("/api/recipes");
export const getRecipeById = (id: string) => api.get(`/api/recipes/${id}`);
export const createRecipe = (data: any) => api.post("/api/recipes", data);
export const updateRecipe = (id: string, data: any) =>
  api.put(`/api/recipes/${id}`, data);
export const deleteRecipe = (id: string) => api.delete(`/api/recipes/${id}`);
