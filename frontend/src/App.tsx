import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Layout/Header";
import { Footer } from "./components/Layout/Footer";
import { Home } from "./pages/Home";
import { Plants } from "./pages/Plants";
import { PlantDetail } from "./pages/PlantDetail";
import { Login } from "./pages/Login";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminPlants } from "./pages/admin/AdminPlants";
import { Diseases } from "./pages/Diseases";
import { DiseaseDetail } from "./pages/DiseaseDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="plants" element={<AdminPlants />} />
            <Route path="diseases" element={<div>Hastalıklar (Yakında)</div>} />
            <Route path="recipes" element={<div>Reçeteler (Yakında)</div>} />
            <Route path="users" element={<div>Kullanıcılar (Yakında)</div>} />
            <Route path="settings" element={<div>Ayarlar (Yakında)</div>} />
          </Route>

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Main App Routes */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/plants" element={<Plants />} />
                    <Route path="/plants/:id" element={<PlantDetail />} />
                    <Route path="/diseases" element={<Diseases />} />
                    <Route path="/diseases/:id" element={<DiseaseDetail />} />
                    <Route
                      path="*"
                      element={
                        <div className="p-8 text-center">Sayfa bulunamadı</div>
                      }
                    />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
