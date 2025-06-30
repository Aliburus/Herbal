import React, { useEffect, useState } from "react";

import { ChevronDown, ChevronRight } from "lucide-react";
import { getPlants } from "../../services/plantService";
import { getDiseases } from "../../services/diseaseService";
import { getRecipes } from "../../services/recipeService";
import {
  addPlantDiseaseRelation,
  deletePlantDiseaseRelation,
  addRecipeDiseaseRelation,
  deleteRecipeDiseaseRelation,
} from "../../services/relationService";
import { Plant, Disease, Recipe } from "../../types";
import { LoadingSpinner } from "../../components/Common/LoadingSpinner";

export const AdminRelations: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "plant-disease" | "recipe-disease"
  >("plant-disease");
  const [openPlant, setOpenPlant] = useState<string | null>(null);
  const [openRecipe, setOpenRecipe] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      getPlants().then((res) => setPlants(res.data)),
      getDiseases().then((res) => setDiseases(res.data)),
      getRecipes().then((res) => setRecipes(res.data)),
    ])
      .catch(() => setError("Veriler yüklenemedi"))
      .finally(() => setLoading(false));
  }, []);

  const handleAddPlantDiseaseRelation = async (
    plantId: string,
    diseaseId: string
  ) => {
    try {
      await addPlantDiseaseRelation(plantId, diseaseId);
      setPlants((prev) =>
        prev.map((plant) => {
          if (plant.id === plantId) {
            const newDiseases = Array.isArray(plant.diseases)
              ? [...(plant.diseases as string[]), diseaseId as string]
              : [diseaseId as string];
            return { ...plant, diseases: newDiseases } as Plant;
          }
          return plant;
        })
      );
    } catch (err: any) {
      alert(err.response?.data?.error || "İlişki eklenemedi");
    }
  };

  const handleDeletePlantDiseaseRelation = async (
    plantId: string,
    diseaseId: string
  ) => {
    if (!window.confirm("Bu ilişkiyi silmek istediğinize emin misiniz?"))
      return;
    try {
      await deletePlantDiseaseRelation(plantId, diseaseId);
      setPlants((prev) =>
        prev.map((plant) => {
          if (plant.id === plantId) {
            const newDiseases = Array.isArray(plant.diseases)
              ? plant.diseases.filter((d) =>
                  typeof d === "string" ? d !== diseaseId : d.id !== diseaseId
                )
              : [];
            return { ...plant, diseases: newDiseases } as Plant;
          }
          return plant;
        })
      );
    } catch (err: any) {
      alert(err.response?.data?.error || "İlişki silinemedi");
    }
  };

  const handleAddRecipeDiseaseRelation = async (
    recipeId: string,
    diseaseId: string
  ) => {
    try {
      await addRecipeDiseaseRelation(recipeId, diseaseId);
      setRecipes((prev) =>
        prev.map((recipe) => {
          if (recipe.id === recipeId) {
            const newDiseases = Array.isArray(recipe.diseases)
              ? [...(recipe.diseases as string[]), diseaseId as string]
              : [diseaseId as string];
            return { ...recipe, diseases: newDiseases } as Recipe;
          }
          return recipe;
        })
      );
    } catch (err: any) {
      alert(err.response?.data?.error || "İlişki eklenemedi");
    }
  };

  const handleDeleteRecipeDiseaseRelation = async (
    recipeId: string,
    diseaseId: string
  ) => {
    if (!window.confirm("Bu ilişkiyi silmek istediğinize emin misiniz?"))
      return;
    try {
      await deleteRecipeDiseaseRelation(recipeId, diseaseId);
      setRecipes((prev) =>
        prev.map((recipe) => {
          if (recipe.id === recipeId) {
            const newDiseases = Array.isArray(recipe.diseases)
              ? recipe.diseases.filter((d) =>
                  typeof d === "string" ? d !== diseaseId : d.id !== diseaseId
                )
              : [];
            return { ...recipe, diseases: newDiseases } as Recipe;
          }
          return recipe;
        })
      );
    } catch (err: any) {
      alert(err.response?.data?.error || "İlişki silinemedi");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">İlişki Yönetimi</h1>
      <div className="mb-6 flex space-x-2">
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-colors ${
            activeTab === "plant-disease"
              ? "border-primary-600 text-primary-700 bg-white"
              : "border-transparent text-gray-500 bg-gray-100 hover:text-primary-600"
          }`}
          onClick={() => setActiveTab("plant-disease")}
        >
          Bitki-Hastalık İlişkileri
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-colors ${
            activeTab === "recipe-disease"
              ? "border-primary-600 text-primary-700 bg-white"
              : "border-transparent text-gray-500 bg-gray-100 hover:text-primary-600"
          }`}
          onClick={() => setActiveTab("recipe-disease")}
        >
          Reçete-Hastalık İlişkileri
        </button>
      </div>
      <div className="mb-8 text-gray-600">
        {activeTab === "plant-disease"
          ? "Bitkiler ile hastalıklar arasındaki ilişkileri yönetin."
          : "Reçeteler ile hastalıklar arasındaki ilişkileri yönetin."}
      </div>
      {activeTab === "plant-disease" && (
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Bitki-Hastalık İlişkileri
          </h2>
          <div className="space-y-3">
            {plants.map((plant) => (
              <div key={plant.id} className="border border-gray-200 rounded-lg">
                <button
                  className="w-full flex items-center justify-between px-4 py-3 focus:outline-none hover:bg-gray-50 transition-colors"
                  onClick={() =>
                    setOpenPlant(openPlant === plant.id ? null : plant.id)
                  }
                >
                  <span className="font-medium text-gray-900">
                    {plant.name}
                  </span>
                  {openPlant === plant.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {openPlant === plant.id && (
                  <div className="px-4 pb-4">
                    <div className="space-y-2">
                      {diseases.map((disease) => {
                        const isRelated =
                          Array.isArray(plant.diseases) &&
                          plant.diseases.some(
                            (d) =>
                              (typeof d === "string" ? d : d.id) === disease.id
                          );

                        return (
                          <div
                            key={disease.id}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-600">
                              {disease.name}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                isRelated
                                  ? handleDeletePlantDiseaseRelation(
                                      plant.id,
                                      disease.id
                                    )
                                  : handleAddPlantDiseaseRelation(
                                      plant.id,
                                      disease.id
                                    );
                              }}
                              className={`px-3 py-1 text-xs rounded-full ${
                                isRelated
                                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                                  : "bg-green-100 text-green-700 hover:bg-green-200"
                              }`}
                            >
                              {isRelated ? "Kaldır" : "Ekle"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "recipe-disease" && (
        <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Reçete-Hastalık İlişkileri
          </h2>
          <div className="space-y-3">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="border border-gray-200 rounded-lg"
              >
                <button
                  className="w-full flex items-center justify-between px-4 py-3 focus:outline-none hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenRecipe(openRecipe === recipe.id ? null : recipe.id);
                  }}
                >
                  <span className="font-medium text-gray-900">
                    {recipe.title}
                  </span>
                  {openRecipe === recipe.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {openRecipe === recipe.id && (
                  <div className="px-4 pb-4">
                    <div className="space-y-2">
                      {diseases.map((disease) => {
                        const isRelated =
                          Array.isArray(recipe.diseases) &&
                          recipe.diseases.some(
                            (d) =>
                              (typeof d === "string" ? d : d.id) === disease.id
                          );

                        return (
                          <div
                            key={disease.id}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-600">
                              {disease.name}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                isRelated
                                  ? handleDeleteRecipeDiseaseRelation(
                                      recipe.id,
                                      disease.id
                                    )
                                  : handleAddRecipeDiseaseRelation(
                                      recipe.id,
                                      disease.id
                                    );
                              }}
                              className={`px-3 py-1 text-xs rounded-full ${
                                isRelated
                                  ? "bg-red-100 text-red-700 hover:bg-red-200"
                                  : "bg-green-100 text-green-700 hover:bg-green-200"
                              }`}
                            >
                              {isRelated ? "Kaldır" : "Ekle"}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
