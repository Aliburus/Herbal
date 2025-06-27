import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Leaf, Grid, List } from "lucide-react";
import { Card } from "../components/Common/Card";
import { SearchBar } from "../components/Common/SearchBar";
import { getPlants } from "../services/plantService";
import { Plant } from "../types";
import { LoadingSpinner } from "../components/Common/LoadingSpinner";

export const Plants: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getPlants()
      .then((res) => {
        console.log("API bitki verisi:", res.data);
        setPlants(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setError("Bitkiler yüklenemedi"))
      .finally(() => setLoading(false));
  }, []);

  const filteredPlants = useMemo(() => {
    return plants.filter((plant) => {
      const matchesSearch =
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  }, [plants, searchQuery]);

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
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Tıbbi Bitkiler
              </h1>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <SearchBar
                placeholder="Bitki adı veya özelliği arayın..."
                onSearch={setSearchQuery}
              />
            </div>
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${
                    viewMode === "grid"
                      ? "bg-primary-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  } transition-colors`}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${
                    viewMode === "list"
                      ? "bg-primary-600 text-white"
                      : "bg-white text-gray-600 hover:bg-gray-50"
                  } transition-colors`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            <span className="font-semibold">{filteredPlants.length}</span> bitki
            bulundu
            {searchQuery && <span> "{searchQuery}" için</span>}
          </p>
        </div>
        {/* Plants Grid/List */}
        {filteredPlants.length > 0 ? (
          <div
            className={`grid gap-6 ${
              viewMode === "grid"
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1"
            }`}
          >
            {filteredPlants.map((plant) => (
              <Card
                key={plant.id}
                title={plant.name}
                description={plant.description}
                image={plant.image}
                onClick={() => navigate(`/plants/${plant.id}`)}
                className={viewMode === "list" ? "md:flex md:items-center" : ""}
              >
                <div className="flex items-center justify-between text-sm text-gray-500">
                  {plant.diseaseCount && plant.diseaseCount > 0 ? (
                    <span className="text-xs text-gray-400 mt-2 block">
                      {plant.diseaseCount} hastalık için etkili
                    </span>
                  ) : null}
                  <span className="text-primary-600 font-medium">Detay →</span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Leaf className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Bitki bulunamadı
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
