import React from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Activity,
  BookOpen,
  Users,
  TrendingUp,
  Plus,
} from "lucide-react";
// Geçici mock veri (hata almamak için)
const plants: any[] = [];
const diseases: any[] = [];
const recipes: any[] = [];

export const AdminDashboard: React.FC = () => {
  const stats = [
    {
      title: "Toplam Bitki",
      value: plants.length,
      icon: Leaf,
      color: "bg-primary-500",
      change: "+12%",
      link: "/admin/plants",
    },
    {
      title: "Hastalık Bilgisi",
      value: diseases.length,
      icon: Activity,
      color: "bg-secondary-500",
      change: "+8%",
      link: "/admin/diseases",
    },
    {
      title: "Doğal Reçete",
      value: recipes.length,
      icon: BookOpen,
      color: "bg-earth-500",
      change: "+15%",
      link: "/admin/recipes",
    },
    {
      title: "Aktif Kullanıcı",
      value: "10.2K",
      icon: Users,
      color: "bg-green-500",
      change: "+23%",
      link: "/admin/users",
    },
  ];

  const quickActions = [
    {
      title: "Yeni Bitki Ekle",
      description: "Sisteme yeni tıbbi bitki bilgisi ekleyin",
      icon: Leaf,
      link: "/admin/plants/new",
      color: "text-primary-600 bg-primary-100",
    },
    {
      title: "Hastalık Tanımla",
      description: "Yeni hastalık bilgisi ve kategorisi oluşturun",
      icon: Activity,
      link: "/admin/diseases/new",
      color: "text-secondary-600 bg-secondary-100",
    },
    {
      title: "Reçete Oluştur",
      description: "Doğal tedavi reçetesi hazırlayın",
      icon: BookOpen,
      link: "/admin/recipes/new",
      color: "text-earth-600 bg-earth-100",
    },
  ];

  const recentActivity = [
    { action: "Nane bitkisi güncellendi", time: "2 saat önce", user: "Admin" },
    {
      action: "Yeni reçete eklendi: Ihlamur Çayı",
      time: "4 saat önce",
      user: "Admin",
    },
    {
      action: "Soğuk algınlığı hastalığı düzenlendi",
      time: "1 gün önce",
      user: "Admin",
    },
    {
      action: "Kuşburnu bitkisi sisteme eklendi",
      time: "2 gün önce",
      user: "Admin",
    },
    {
      action: "Sindirim karışımı reçetesi oluşturuldu",
      time: "3 gün önce",
      user: "Admin",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Yönetim Paneli</h1>
        <p className="text-gray-600 mt-1">
          Dijital Lokman Hekim sistem yönetimi
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link
            key={index}
            to={stat.link}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-green-600 text-sm font-medium">
                {stat.change}
              </span>
              <span className="text-gray-400 text-sm group-hover:text-primary-600 transition-colors">
                Görüntüle →
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Hızlı İşlemler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all group"
            >
              <div className={`p-2 rounded-lg ${action.color} w-fit mb-3`}>
                <action.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-700">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600">{action.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Son Aktiviteler
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {activity.time}
                    </span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">
                      {activity.user}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Chart Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Kullanım İstatistikleri
          </h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Grafik yakında eklenecek</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
