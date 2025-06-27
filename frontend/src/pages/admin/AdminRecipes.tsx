import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, BookOpen, Plus } from "lucide-react";
import { SearchBar } from "../../components/Common/SearchBar";
import { getRecipes, deleteRecipe } from "../../services/recipeService";
import { Recipe } from "../../types";
import { LoadingSpinner } from "../../components/Common/LoadingSpinner";

export const AdminRecipes: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getRecipes()
      .then((res) => setRecipes(res.data.slice().reverse()))
      .catch(() => setError("Reçeteler yüklenemedi"))
      .finally(() => setLoading(false));
  }, []);

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu reçeteyi silmek istediğinize emin misiniz?"))
      return;
    setDeleting(id);
    try {
      await deleteRecipe(id);
      setRecipes((prev) => prev.filter((r) => r.id !== id));
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
            <BookOpen className="h-7 w-7 text-earth-600" />
            <span>Reçete Yönetimi</span>
          </h1>
          <Link
            to="/admin/recipes/new"
            className="inline-flex items-center px-4 py-2 bg-earth-600 text-white rounded-lg hover:bg-earth-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Reçete Ekle
          </Link>
        </div>
        <div className="mb-6 flex items-center space-x-4">
          <SearchBar
            placeholder="Reçete başlığı veya içeriği ara..."
            onSearch={setSearchQuery}
            className="w-full max-w-md"
          />
        </div>
        {filteredRecipes.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
            <table className="min-w-full table-fixed divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider w-1/4 max-w-xs">
                    Başlık
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider w-1/2 max-w-md">
                    İçerik
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    İşlemler
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRecipes.map((recipe) => (
                  <tr
                    key={recipe.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 truncate max-w-xs">
                      {recipe.title}
                    </td>
                    <td
                      className="px-6 py-4 whitespace-nowrap text-gray-700 truncate max-w-md"
                      title={recipe.content}
                    >
                      {recipe.content.length > 80
                        ? recipe.content.slice(0, 80) + "..."
                        : recipe.content}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/recipes/edit/${recipe.id}`}
                          className="text-earth-600 hover:text-earth-800"
                        >
                          <Edit className="h-5 w-5" />
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-800"
                          onClick={() => handleDelete(recipe.id)}
                          disabled={deleting === recipe.id}
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
              Reçete bulunamadı
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
