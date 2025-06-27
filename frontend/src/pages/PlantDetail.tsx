import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Leaf, Clock, AlertCircle, BookOpen } from "lucide-react";
import { getPlantById } from "../services/plantService";
import { getDiseases } from "../services/diseaseService";
import { getRecipes } from "../services/recipeService";
import { Plant, Disease, Recipe } from "../types";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";
import { Card } from "../components/Common/Card";

export const PlantDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([getPlantById(id!), getDiseases(), getRecipes()])
      .then(([plantRes, diseasesRes, recipesRes]) => {
        setPlant(plantRes.data);
        setDiseases(diseasesRes.data);
        setRecipes(recipesRes.data);
      })
      .catch(() => setError("Bitki detayı yüklenemedi"))
      .finally(() => setLoading(false));
  }, [id]);

  // Resim URL'sini oluştur
  const getImageUrl = (imagePath: string) => {
    if (!imagePath) return "";

    // Backend'den sadece dosya adı geliyor, uploads/ ekle
    return `${import.meta.env.VITE_API_URL?.replace(
      "/api",
      ""
    )}/uploads/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  if (error || !plant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Leaf className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bitki bulunamadı
          </h2>
          <p className="text-gray-600 mb-6">Aradığınız bitki mevcut değil.</p>
          <Link
            to="/plants"
            className="text-primary-600 hover:text-primary-700"
          >
            ← Bitki listesine dön
          </Link>
        </div>
      </div>
    );
  }

  const relatedDiseases = plant.diseases || [];
  const relatedRecipes = plant.recipes || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/plants"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Bitkilere geri dön</span>
        </Link>

        {/* Plant Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={getImageUrl(plant.image)}
                alt={plant.name}
                className="w-full h-64 md:h-full object-cover"
                onError={(e) => {
                  console.error("Resim yüklenemedi:", plant.image);
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="md:w-2/3 p-8">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {plant.name}
                </h1>
              </div>
              <Card
                title={plant.name}
                description={plant.description}
                expandableDescription={true}
              />
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-primary-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Kullanım Şekli
                    </h3>
                    <p className="text-gray-700">{plant.usage}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Diseases */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <AlertCircle className="h-6 w-6 text-secondary-600" />
            <span>Tedavi Edilen Hastalıklar</span>
          </h2>
          {relatedDiseases.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {relatedDiseases.map((disease, idx) => {
                const d =
                  typeof disease === "string"
                    ? { id: disease, name: disease }
                    : disease;
                return (
                  <Link
                    key={d.id || idx}
                    to={`/diseases/${d.id}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
                  >
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 mb-1">
                      {d.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {"description" in d ? d.description : "Açıklama yok."}
                    </p>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">
              Bu bitki için henüz hastalık kaydı bulunmuyor.
            </p>
          )}
        </div>

        {/* Related Recipes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-earth-600" />
            <span>İlgili Reçeteler</span>
          </h2>
          {relatedRecipes.length > 0 ? (
            <div className="space-y-4">
              {relatedRecipes.map((recipe, idx) => {
                const r =
                  typeof recipe === "string"
                    ? { id: recipe, title: recipe }
                    : recipe;
                return (
                  <Card
                    key={r.id || idx}
                    title={r.title}
                    description={"content" in r ? r.content : "Açıklama yok."}
                    expandableDescription={true}
                  />
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500">
              Bu bitki için henüz reçete kaydı bulunmuyor.
            </p>
          )}
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-yellow-800">Önemli Uyarı</h3>
              <p className="text-yellow-700 text-sm mt-1">
                Bitkisel tedavi uygulamadan önce mutlaka bir sağlık uzmanına
                danışın. Bu bilgiler tanı ve tedavi amaçlı kullanılmamalıdır.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
