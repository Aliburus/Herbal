import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Edit,
  Trash2,
  Link as LinkIcon,
  Plus,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { SearchBar } from "../../components/Common/SearchBar";
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
  const [searchQuery, setSearchQuery] = useState("");
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
      // Sayfayı yenile
      window.location.reload();
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
      // Sayfayı yenile
      window.location.reload();
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
      // Sayfayı yenile
      window.location.reload();
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
      // Sayfayı yenile
      window.location.reload();
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-2">
            <LinkIcon className="h-7 w-7 text-earth-600" />
            <span>İlişki Yönetimi</span>
          </h1>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("plant-disease")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "plant-disease"
                  ? "border-earth-500 text-earth-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Bitki-Hastalık İlişkileri
            </button>
            <button
              onClick={() => setActiveTab("recipe-disease")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "recipe-disease"
                  ? "border-earth-500 text-earth-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Reçete-Hastalık İlişkileri
            </button>
          </nav>
        </div>

        {activeTab === "plant-disease" && (
          <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Bitki-Hastalık İlişkileri
            </h2>
            <div className="space-y-3">
              {plants.map((plant) => (
                <div
                  key={plant.id}
                  className="border border-gray-200 rounded-lg"
                >
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
                                (typeof d === "string" ? d : d.id) ===
                                disease.id
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
                      setOpenRecipe(
                        openRecipe === recipe.id ? null : recipe.id
                      );
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
                                (typeof d === "string" ? d : d.id) ===
                                disease.id
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
    </div>
  );
};
