import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminDiseaseForm } from "./AdminDiseaseForm";
import { getDiseaseById, updateDisease } from "../../services/diseaseService";
import { getPlants } from "../../services/plantService";
import { Disease, Plant } from "../../types";

export const AdminDiseaseEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [disease, setDisease] = useState<Disease | null>(null);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plantsLoading, setPlantsLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    getDiseaseById(id!)
      .then((res) => setDisease(res.data))
      .catch(() => setError("Hastalık bulunamadı"))
      .finally(() => setLoading(false));
    getPlants()
      .then((res) => setPlants(res.data))
      .finally(() => setPlantsLoading(false));
  }, [id]);

  const handleSubmit = async (values: {
    name: string;
    description: string;
    plantIds: string[];
  }) => {
    setSaving(true);
    setError("");
    try {
      await updateDisease(id!, values);
      navigate("/admin/diseases");
    } catch (err: any) {
      setError(err.response?.data?.error || "Hastalık güncellenemedi");
    } finally {
      setSaving(false);
    }
  };

  if (loading || plantsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Yükleniyor...
      </div>
    );
  }
  if (error || !disease) {
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
          Hastalığı Düzenle
        </h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <AdminDiseaseForm
          initialValues={disease}
          plants={plants}
          onSubmit={handleSubmit}
          loading={saving}
          submitText="Güncelle"
        />
      </div>
    </div>
  );
};
