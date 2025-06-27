import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminRecipeForm } from "./AdminRecipeForm";
import { createRecipe } from "../../services/recipeService";
import { getDiseases } from "../../services/diseaseService";
import { Disease } from "../../types";

export const AdminRecipeCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [diseasesLoading, setDiseasesLoading] = useState(true);

  useEffect(() => {
    getDiseases()
      .then((res) => setDiseases(res.data))
      .finally(() => setDiseasesLoading(false));
  }, []);

  const handleSubmit = async (values: {
    title: string;
    content: string;
    usage: string;
    diseaseIds: string[];
  }) => {
    setLoading(true);
    setError("");
    try {
      await createRecipe(values);
      navigate("/admin/recipes");
    } catch (err: any) {
      setError(err.response?.data?.error || "Reçete eklenemedi");
    } finally {
      setLoading(false);
    }
  };

  if (diseasesLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Yükleniyor...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Yeni Reçete Ekle
        </h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <AdminRecipeForm
          diseases={diseases}
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Ekle"
        />
      </div>
    </div>
  );
};
