import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getDiseaseById } from "../services/diseaseService";
import { Disease, Plant } from "../types";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";
import { Card } from "../components/Common/Card";

const INITIAL_COUNT = 4;
const LOAD_MORE_COUNT = 12;

export const DiseaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [disease, setDisease] = useState<Disease | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [plantCount, setPlantCount] = useState(INITIAL_COUNT);
  const [recipeCount, setRecipeCount] = useState(INITIAL_COUNT);
  const [openRecipeIds, setOpenRecipeIds] = useState<(string | number)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getDiseaseById(id!)
      .then((res) => setDisease(res.data))
      .catch(() => setError("Hastalık detayı yüklenemedi"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  if (error || !disease) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Hastalık bulunamadı
          </h2>
          <p className="text-gray-600 mb-6">
            Aradığınız hastalık mevcut değil.
          </p>
          <Link
            to="/diseases"
            className="text-primary-600 hover:text-primary-700"
          >
            ← Hastalık listesine dön
          </Link>
        </div>
      </div>
    );
  }

  const relatedPlants = disease.plants || [];
  const visiblePlants = relatedPlants.slice(0, plantCount);
  const hasMorePlants = relatedPlants.length > plantCount;
  const canShowLessPlants = plantCount > INITIAL_COUNT;

  const relatedRecipes = disease.recipes || [];
  const visibleRecipes = relatedRecipes.slice(0, recipeCount);
  const hasMoreRecipes = relatedRecipes.length > recipeCount;
  const canShowLessRecipes = recipeCount > INITIAL_COUNT;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/diseases"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <span>← Hastalıklara geri dön</span>
        </Link>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {disease.name}
          </h1>
          <p className="text-gray-600 text-lg mb-4">{disease.description}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            İlişkili Bitkiler
          </h2>
          {relatedPlants.length > 0 ? (
            <>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {visiblePlants.map((plant: any) => (
                  <Card
                    key={plant.id || plant._id}
                    title={plant.name}
                    description={plant.description}
                    image={plant.image}
                    onClick={() => navigate(`/plants/${plant.id || plant._id}`)}
                  />
                ))}
              </div>
              <div className="flex gap-4 mt-6">
                {hasMorePlants && (
                  <button
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    onClick={() => setPlantCount((c) => c + LOAD_MORE_COUNT)}
                  >
                    Devamını Gör
                  </button>
                )}
                {canShowLessPlants && (
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    onClick={() => setPlantCount(INITIAL_COUNT)}
                  >
                    Daha Az Gör
                  </button>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-500">Bu hastalıkla ilişkili bitki yok.</p>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            İlişkili Reçeteler
          </h2>
          {relatedRecipes.length > 0 ? (
            <>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                {visibleRecipes.map((recipe: any) => {
                  const maxLength = 180;
                  const isLong = recipe.content.length > maxLength;
                  const recipeId = recipe.id || recipe._id;
                  const showFull = openRecipeIds.includes(recipeId);
                  const shortContent = isLong
                    ? recipe.content.slice(0, maxLength) + "..."
                    : recipe.content;
                  return (
                    <Card
                      key={recipeId}
                      title={recipe.title}
                      description={recipe.content}
                      expandableDescription={true}
                    />
                  );
                })}
              </div>
              <div className="flex gap-4 mt-6">
                {hasMoreRecipes && (
                  <button
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    onClick={() => setRecipeCount((c) => c + LOAD_MORE_COUNT)}
                  >
                    Devamını Gör
                  </button>
                )}
                {canShowLessRecipes && (
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    onClick={() => setRecipeCount(INITIAL_COUNT)}
                  >
                    Daha Az Gör
                  </button>
                )}
              </div>
            </>
          ) : (
            <p className="text-gray-500">Bu hastalıkla ilişkili reçete yok.</p>
          )}
        </div>
      </div>
    </div>
  );
};
