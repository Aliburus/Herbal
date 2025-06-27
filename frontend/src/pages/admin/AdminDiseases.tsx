import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, Activity, Plus } from "lucide-react";
import { SearchBar } from "../../components/Common/SearchBar";
import { getDiseases, deleteDisease } from "../../services/diseaseService";
import { Disease } from "../../types";
import { LoadingSpinner } from "../../components/Common/LoadingSpinner";

export const AdminDiseases: React.FC = () => {
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getDiseases()
      .then((res) => setDiseases(res.data.slice().reverse()))
      .catch(() => setError("Hastalıklar yüklenemedi"))
      .finally(() => setLoading(false));
  }, []);

  const filteredDiseases = diseases.filter(
    (disease) =>
      disease.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      disease.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu hastalığı silmek istediğinize emin misiniz?"))
      return;
    setDeleting(id);
    try {
      await deleteDisease(id);
      setDiseases((prev) => prev.filter((d) => d.id !== id));
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
            <Activity className="h-7 w-7 text-secondary-600" />
            <span>Hastalık Yönetimi</span>
          </h1>
          <Link
            to="/admin/diseases/new"
            className="inline-flex items-center px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Hastalık Ekle
          </Link>
        </div>
        <div className="mb-6 flex items-center space-x-4">
          <SearchBar
            placeholder="Hastalık adı veya açıklaması ara..."
            onSearch={setSearchQuery}
            className="w-full max-w-md"
          />
        </div>
        {filteredDiseases.length > 0 ? (
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
                {filteredDiseases.map((disease) => (
                  <tr
                    key={disease.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {disease.name}
                    </td>
                    <td
                      className="px-6 py-4 max-w-xs whitespace-nowrap text-gray-700 overflow-hidden text-ellipsis"
                      title={disease.description}
                      style={{ maxWidth: "320px" }}
                    >
                      {disease.description.length > 80
                        ? disease.description.slice(0, 80) + "..."
                        : disease.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/diseases/edit/${disease.id}`}
                          className="text-secondary-600 hover:text-secondary-800"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(disease.id)}
                          disabled={deleting === disease.id}
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
