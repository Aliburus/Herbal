import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AdminDiseaseForm } from "./AdminDiseaseForm";
import { createDisease } from "../../services/diseaseService";
import { getPlants } from "../../services/plantService";
import { Plant } from "../../types";

export const AdminDiseaseCreate: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [plants, setPlants] = useState<Plant[]>([]);
  const [plantsLoading, setPlantsLoading] = useState(true);

  useEffect(() => {
    getPlants()
      .then((res) => setPlants(res.data))
      .finally(() => setPlantsLoading(false));
  }, []);

  const handleSubmit = async (values: {
    name: string;
    description: string;
    plantIds: string[];
  }) => {
    setLoading(true);
    setError("");
    try {
      await createDisease(values);
      navigate("/admin/diseases");
    } catch (err: any) {
      setError(err.response?.data?.error || "Hastalık eklenemedi");
    } finally {
      setLoading(false);
    }
  };

  if (plantsLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Yükleniyor...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-8 border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Yeni Hastalık Ekle
        </h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <AdminDiseaseForm
          plants={plants}
          onSubmit={handleSubmit}
          loading={loading}
          submitText="Ekle"
        />
      </div>
    </div>
  );
};
