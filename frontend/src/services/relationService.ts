import api from "./api";

// Bitki-Hastalık ilişkileri
export const addPlantDiseaseRelation = (plant_id: string, disease_id: string) =>
  api.post("/api/relations/plant-disease", { plant_id, disease_id });

export const deletePlantDiseaseRelation = (
  plant_id: string,
  disease_id: string
) =>
  api.delete("/api/relations/plant-disease", {
    data: { plant_id, disease_id },
  });

// Reçete-Hastalık ilişkileri
export const addRecipeDiseaseRelation = (
  recipe_id: string,
  disease_id: string
) => api.post("/api/relations/recipe-disease", { recipe_id, disease_id });

export const deleteRecipeDiseaseRelation = (
  recipe_id: string,
  disease_id: string
) =>
  api.delete("/api/relations/recipe-disease", {
    data: { recipe_id, disease_id },
  });
