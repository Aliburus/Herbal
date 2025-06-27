import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Layout/Header";
import { Footer } from "./components/Layout/Footer";
import { Home } from "./pages/Home";
import { Plants } from "./pages/Plants";
import { PlantDetail } from "./pages/PlantDetail";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminPlants } from "./pages/admin/AdminPlants";
import { AdminPlantCreate } from "./pages/admin/AdminPlantCreate";
import { AdminPlantEdit } from "./pages/admin/AdminPlantEdit";
import { AdminDiseases } from "./pages/admin/AdminDiseases";
import { AdminDiseaseCreate } from "./pages/admin/AdminDiseaseCreate";
import { AdminDiseaseEdit } from "./pages/admin/AdminDiseaseEdit";
import { AdminRecipes } from "./pages/admin/AdminRecipes";
import { AdminRecipeCreate } from "./pages/admin/AdminRecipeCreate";
import { AdminRecipeEdit } from "./pages/admin/AdminRecipeEdit";
import { AdminRelations } from "./pages/admin/AdminRelations";
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
            <Route path="plants/new" element={<AdminPlantCreate />} />
            <Route path="plants/edit/:id" element={<AdminPlantEdit />} />
            <Route path="diseases" element={<AdminDiseases />} />
            <Route path="diseases/new" element={<AdminDiseaseCreate />} />
            <Route path="diseases/edit/:id" element={<AdminDiseaseEdit />} />
            <Route path="recipes" element={<AdminRecipes />} />
            <Route path="recipes/new" element={<AdminRecipeCreate />} />
            <Route path="recipes/edit/:id" element={<AdminRecipeEdit />} />
            <Route path="relations" element={<AdminRelations />} />
            <Route path="users" element={<div>Kullanıcılar (Yakında)</div>} />
            <Route path="settings" element={<div>Ayarlar (Yakında)</div>} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Legal Routes */}
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

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
