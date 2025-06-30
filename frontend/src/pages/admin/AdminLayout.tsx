import React from "react";
import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import {
  LayoutDashboard,
  Leaf,
  Activity,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Link as LinkIcon,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-500 text-lg">
        Yükleniyor...
      </div>
    );
  }
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      current: location.pathname === "/admin",
    },
    {
      name: "Bitkiler",
      href: "/admin/plants",
      icon: Leaf,
      current: location.pathname.startsWith("/admin/plants"),
    },
    {
      name: "Hastalıklar",
      href: "/admin/diseases",
      icon: Activity,
      current: location.pathname.startsWith("/admin/diseases"),
    },
    {
      name: "Reçeteler",
      href: "/admin/recipes",
      icon: BookOpen,
      current: location.pathname.startsWith("/admin/recipes"),
    },
    {
      name: "İlişkiler",
      href: "/admin/relations",
      icon: LinkIcon,
      current: location.pathname.startsWith("/admin/relations"),
    },
    {
      name: "Kullanıcılar",
      href: "/admin/users",
      icon: Users,
      current: location.pathname.startsWith("/admin/users"),
    },
    {
      name: "Ayarlar",
      href: "/admin/settings",
      icon: Settings,
      current: location.pathname.startsWith("/admin/settings"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Fixed Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen flex-shrink-0 fixed top-0 left-0 h-screen z-30">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Leaf className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
              <p className="text-xs text-gray-500">Yönetim Sistemi</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="px-3 pb-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? "bg-primary-50 text-primary-700 border-r-2 border-primary-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-primary-600"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 transition-colors ${
                      item.current
                        ? "text-primary-600"
                        : "text-gray-400 group-hover:text-primary-600"
                    }`}
                  />
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
              title="Çıkış Yap"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
          <Link
            to="/"
            className="mt-3 text-xs text-gray-500 hover:text-primary-600 transition-colors block"
          >
            ← Ana siteye dön
          </Link>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 min-w-0 ml-64">
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
