import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Leaf, Activity, BookOpen, Users } from "lucide-react";
import { getStats as getPlantStats } from "../../services/plantService";
import { getUserStats } from "../../services/authService";
import { getPlants } from "../../services/plantService";
import { getDiseases } from "../../services/diseaseService";
import { getRecipes } from "../../services/recipeService";

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    plantCount: 0,
    diseaseCount: 0,
    recipeCount: 0,
    userCount: 0,
  });
  const [recentPlants, setRecentPlants] = useState<any[]>([]);
  const [recentDiseases, setRecentDiseases] = useState<any[]>([]);
  const [recentRecipes, setRecentRecipes] = useState<any[]>([]);

  useEffect(() => {
    getPlantStats().then((res) => {
      setStats((prev) => ({ ...prev, ...res.data }));
    });
    getUserStats().then((res) => {
      setStats((prev) => ({ ...prev, userCount: res.data.userCount }));
    });
    getPlants().then((res) => setRecentPlants(res.data.slice(-5).reverse()));
    getDiseases().then((res) =>
      setRecentDiseases(res.data.slice(-5).reverse())
    );
    getRecipes().then((res) => setRecentRecipes(res.data.slice(-5).reverse()));
  }, []);

  const statCards = [
    {
      title: "Toplam Bitki",
      value: stats.plantCount,
      icon: Leaf,
      color: "bg-emerald-500",
      link: "/admin/plants",
    },
    {
      title: "Hastalık Bilgisi",
      value: stats.diseaseCount,
      icon: Activity,
      color: "bg-rose-500",
      link: "/admin/diseases",
    },
    {
      title: "Doğal Reçete",
      value: stats.recipeCount,
      icon: BookOpen,
      color: "bg-amber-500",
      link: "/admin/recipes",
    },
    {
      title: "Kullanıcı",
      value: stats.userCount,
      icon: Users,
      color: "bg-blue-500",
      link: "/admin/users",
    },
  ];

  const quickActions = [
    {
      title: "Yeni Bitki Ekle",
      description: "Sisteme yeni tıbbi bitki bilgisi ekleyin",
      icon: Leaf,
      link: "/admin/plants/new",
      color: "text-emerald-600 bg-emerald-50 hover:bg-emerald-100",
    },
    {
      title: "Hastalık Tanımla",
      description: "Yeni hastalık bilgisi ve kategorisi oluşturun",
      icon: Activity,
      link: "/admin/diseases/new",
      color: "text-rose-600 bg-rose-50 hover:bg-rose-100",
    },
    {
      title: "Reçete Oluştur",
      description: "Doğal tedavi reçetesi hazırlayın",
      icon: BookOpen,
      link: "/admin/recipes/new",
      color: "text-amber-600 bg-amber-50 hover:bg-amber-100",
    },
  ];

  return (
    <div className="space-y-8 w-full overflow-x-hidden min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Yönetim Paneli</h1>
        <p className="text-gray-600 mt-1">
          Dijital Lokman Hekim sistem yönetimi
        </p>
      </div>

      {/* Stats Grid - En üstte */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-[calc(100vw-256px)] overflow-x-hidden">
        {statCards.map((stat, index) => (
          <Link to={stat.link} key={index}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 group cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color} shadow-sm`}>
                  <stat.icon className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
                  Detayları görüntüle →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions - Hemen altında */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Hızlı İşlemler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Link to={action.link} key={index}>
              <div
                className={`p-6 border-2 border-gray-200 rounded-xl hover:border-gray-300 transition-all duration-200 group cursor-pointer ${
                  action.color.split(" ")[2]
                }`}
              >
                <div
                  className={`p-3 rounded-xl ${action.color.split(" ")[0]} ${
                    action.color.split(" ")[1]
                  } w-fit mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                  {action.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Son Eklenenler - Ortada */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bitkiler */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Son Eklenen Bitkiler
          </h2>
          <ul className="space-y-2">
            {recentPlants.map((plant) => (
              <li key={plant.id}>
                <Link
                  to={`/plants/${plant.id}`}
                  className="block px-2 py-1 rounded hover:bg-primary-50 transition group"
                >
                  <span className="font-medium text-primary-700 group-hover:underline">
                    {plant.name}
                  </span>
                  <span className="text-gray-600">
                    {" "}
                    — {plant.description?.slice(0, 40)}
                  </span>
                </Link>
              </li>
            ))}
            {recentPlants.length === 0 && (
              <li className="text-gray-400">Kayıt yok</li>
            )}
          </ul>
        </div>
        {/* Hastalıklar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Son Eklenen Hastalıklar
          </h2>
          <ul className="space-y-2">
            {recentDiseases.map((disease) => (
              <li key={disease.id}>
                <Link
                  to={`/diseases/${disease.id}`}
                  className="block px-2 py-1 rounded hover:bg-secondary-50 transition group"
                >
                  <span className="font-medium text-secondary-700 group-hover:underline">
                    {disease.name}
                  </span>
                  <span className="text-gray-600">
                    {" "}
                    — {disease.description?.slice(0, 40)}
                  </span>
                </Link>
              </li>
            ))}
            {recentDiseases.length === 0 && (
              <li className="text-gray-400">Kayıt yok</li>
            )}
          </ul>
        </div>
        {/* Reçeteler */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Son Eklenen Reçeteler
          </h2>
          <ul className="space-y-2">
            {recentRecipes.map((recipe) => (
              <li key={recipe.id}>
                <Link
                  to={`/admin/recipes/edit/${recipe.id}`}
                  className="block px-2 py-1 rounded hover:bg-amber-50 transition group"
                >
                  <span className="font-medium text-amber-700 group-hover:underline">
                    {recipe.title}
                  </span>
                  <span className="text-gray-600">
                    {" "}
                    — {recipe.content?.slice(0, 40)}
                  </span>
                </Link>
              </li>
            ))}
            {recentRecipes.length === 0 && (
              <li className="text-gray-400">Kayıt yok</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
