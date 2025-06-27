import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Leaf, Search, BookOpen, Users, Settings } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export const Header: React.FC = () => {
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-primary-600 border-primary-600"
      : "text-gray-600 hover:text-primary-600 border-transparent hover:border-primary-300";
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-primary-100 rounded-lg group-hover:bg-primary-200 transition-colors">
              <Leaf className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Dijital Lokman
              </h1>
              <p className="text-xs text-gray-500">Bitkisel Tedavi Rehberi</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/plants"
              className={`flex items-center space-x-1 px-3 py-2 border-b-2 text-sm font-medium transition-colors ${isActive(
                "/plants"
              )}`}
            >
              <Leaf className="h-4 w-4" />
              <span>Bitkiler</span>
            </Link>
            <Link
              to="/diseases"
              className={`flex items-center space-x-1 px-3 py-2 border-b-2 text-sm font-medium transition-colors ${isActive(
                "/diseases"
              )}`}
            >
              <Search className="h-4 w-4" />
              <span>Hastalıklar</span>
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className={`flex items-center space-x-1 px-3 py-2 border-b-2 text-sm font-medium transition-colors ${isActive(
                  "/admin"
                )}`}
              >
                <Settings className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-sm text-gray-700">{user.email}</span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
