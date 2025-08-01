import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit, Trash2, Leaf, Search, Filter } from "lucide-react";
import { SearchBar } from "../../components/Common/SearchBar";
import { getPlants, deletePlant } from "../../services/plantService";
import { Plant } from "../../types";
import { LoadingSpinner } from "../../components/Common/LoadingSpinner";

export const AdminPlants: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getPlants()
      .then((res) => setPlants(res.data.slice().reverse()))
      .catch(() => setError("Bitkiler yüklenemedi"))
      .finally(() => setLoading(false));
  }, []);

  const filteredPlants = plants.filter(
    (plant) =>
      plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      plant.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu bitkiyi silmek istediğinize emin misiniz?")) return;
    setDeleting(id);
    try {
      await deletePlant(id);
      setPlants((prev) => prev.filter((p) => p.id !== id));
    } catch {
      alert("Silme işlemi başarısız oldu.");
    } finally {
      setDeleting(null);
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
            <Leaf className="h-7 w-7 text-primary-600" />
            <span>Bitki Yönetimi</span>
          </h1>
          <Link
            to="/admin/plants/new"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Bitki Ekle
          </Link>
        </div>
        <div className="mb-6 flex items-center space-x-4">
          <SearchBar
            placeholder="Bitki adı veya açıklaması ara..."
            onSearch={setSearchQuery}
            className="w-full max-w-md"
          />
        </div>
        {filteredPlants.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Adı
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Açıklama
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPlants.map((plant) => (
                  <tr
                    key={plant.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {plant.name}
                    </td>
                    <td
                      className="px-6 py-4 max-w-xs whitespace-nowrap text-gray-700 overflow-hidden text-ellipsis"
                      title={plant.description}
                      style={{ maxWidth: "320px" }}
                    >
                      {plant.description.length > 80
                        ? plant.description.slice(0, 80) + "..."
                        : plant.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/plants/edit/${plant.id}`}
                          className="text-primary-600 hover:text-primary-800"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(plant.id)}
                          disabled={deleting === plant.id}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
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
