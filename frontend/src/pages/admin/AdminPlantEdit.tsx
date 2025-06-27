import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminPlantForm } from "./AdminPlantForm";
import { getPlantById, updatePlant } from "../../services/plantService";
import { getDiseases } from "../../services/diseaseService";
import { Plant, Disease } from "../../types";

export const AdminPlantEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [plant, setPlant] = useState<Plant | null>(null);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [diseasesLoading, setDiseasesLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setLoading(true);
    getPlantById(id!)
      .then((res) => setPlant(res.data))
      .catch(() => setError("Bitki bulunamadı"))
      .finally(() => setLoading(false));
    getDiseases()
      .then((res) => setDiseases(res.data))
      .finally(() => setDiseasesLoading(false));
  }, [id]);

  const handleSubmit = async (values: {
    name: string;
    description: string;
    usage: string;
    image: string;
    diseaseIds: string[];
  }) => {
    setSaving(true);
    setError("");
    try {
      await updatePlant(id!, values);
      navigate("/admin/plants");
    } catch (err: any) {
      setError(err.response?.data?.error || "Bitki güncellenemedi");
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
  if (error || !plant) {
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
          Bitkiyi Düzenle
        </h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <AdminPlantForm
          initialValues={plant}
          diseases={diseases}
          onSubmit={handleSubmit}
          loading={saving}
          submitText="Güncelle"
        />
      </div>
    </div>
  );
};
