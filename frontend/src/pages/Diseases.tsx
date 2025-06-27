import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getDiseases } from "../services/diseaseService";
import { Disease } from "../types";
import { Card } from "../components/Common/Card";
import { SearchBar } from "../components/Common/SearchBar";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";

export const Diseases: React.FC = () => {
  const navigate = useNavigate();
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getDiseases()
      .then((res) => setDiseases(res.data))
      .catch(() => setError("Hastalıklar yüklenemedi"))
      .finally(() => setLoading(false));
  }, []);

  const filteredDiseases = useMemo(() => {
    return diseases.filter(
      (disease) =>
        disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        disease.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [diseases, searchQuery]);

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
        <div className="mb-8 flex items-center space-x-3">
          <h1 className="text-3xl font-bold text-gray-900">Hastalıklar</h1>
        </div>
        <div className="mb-6 max-w-md">
          <SearchBar
            placeholder="Hastalık adı veya açıklaması arayın..."
            onSearch={setSearchQuery}
          />
        </div>
        {filteredDiseases.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredDiseases.map((disease) => (
              <Card
                key={disease.id}
                title={disease.name}
                description={disease.description}
                onClick={() => navigate(`/diseases/${disease.id}`)}
              >
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{disease.relatedPlantCount ?? 0} bitki ilişkili</span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Hastalık bulunamadı
            </h3>
            <p className="text-gray-500">
              Arama kriterlerinizi değiştirerek tekrar deneyin.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
