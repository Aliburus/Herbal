import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminRecipeForm } from "./AdminRecipeForm";
import { getRecipeById, updateRecipe } from "../../services/recipeService";
import { getDiseases } from "../../services/diseaseService";
import { Recipe, Disease } from "../../types";

export const AdminRecipeEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [diseasesLoading, setDiseasesLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRecipeById(id!)
      .then((res) => setRecipe(res.data))
      .catch(() => setError("Reçete bulunamadı"))
      .finally(() => setLoading(false));
    getDiseases()
      .then((res) => setDiseases(res.data))
      .finally(() => setDiseasesLoading(false));
  }, [id]);

  const handleSubmit = async (values: {
    title: string;
    content: string;
    usage: string;
    diseaseIds: string[];
  }) => {
    setSaving(true);
    setError("");
    try {
      await updateRecipe(id!, values);
      navigate("/admin/recipes");
    } catch (err: any) {
      setError(err.response?.data?.error || "Reçete güncellenemedi");
    } finally {
      setSaving(false);
    }
  };

  if (loading || diseasesLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Yükleniyor...
      </div>
    );
  }
  if (error || !recipe) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Reçeteyi Düzenle
        </h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <AdminRecipeForm
          initialValues={recipe}
          diseases={diseases}
          onSubmit={handleSubmit}
          loading={saving}
          submitText="Güncelle"
        />
      </div>
    </div>
  );
};
