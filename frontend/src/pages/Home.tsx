import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Leaf,
  Search,
  BookOpen,
  ArrowRight,
  Shield,
  Activity,
} from "lucide-react";

import { getStats } from "../services/plantService";

export const Home: React.FC = () => {
  const [stats, setStats] = useState({
    plantCount: 0,
    diseaseCount: 0,
    recipeCount: 0,
  });
  useEffect(() => {
    getStats().then((res) => setStats(res.data));
  }, []);

  const features = [
    {
      icon: Search,
      title: "Akıllı Arama",
      description:
        "Hastalığınıza göre bitki bulun veya bitkiye göre tedavi edilebilecek hastalıkları keşfedin.",
    },
    {
      icon: BookOpen,
      title: "Doğal Reçeteler",
      description:
        "Uzmanlar tarafından hazırlanmış doğal tedavi reçetelerine kolayca erişin.",
    },
    {
      icon: Shield,
      title: "Güvenilir Bilgi",
      description:
        "Tüm bilgilerimiz bilimsel kaynaklara dayanır ve uzmanlar tarafından doğrulanır.",
    },
  ];

  // Dinamik stats
  const statsArr = [
    { number: stats.plantCount, label: "Tıbbi Bitki" },
    { number: stats.diseaseCount, label: "Hastalık Bilgisi" },
    { number: stats.recipeCount, label: "Doğal Reçete" },
    { number: "10K+", label: "Mutlu Kullanıcı" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-primary-100 rounded-2xl">
                <Leaf className="h-12 w-12 text-primary-600" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Doğanın Gücü
              <span className="block text-primary-600">Elinizin Altında</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Binlerce yıllık geleneksel bilgiyi modern teknoloji ile
              birleştirdik. Bitkisel tedavi yöntemlerini keşfedin, doğal sağlık
              çözümlerine ulaşın.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/plants"
                className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full border border-gray-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <Leaf className="h-5 w-5 text-primary-600" />
                <span>Bitkiler</span>
              </Link>
              <Link
                to="/diseases"
                className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-full border border-gray-200 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 flex items-center space-x-2"
              >
                <Activity className="h-5 w-5 text-rose-500" />
                <span>Hastalıklar</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Neden Dijital Lokman?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Geleneksel bilgiyi modern teknoloji ile harmanlayarak size en iyi
              deneyimi sunuyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="mb-6 inline-flex p-4 bg-primary-100 rounded-2xl group-hover:bg-primary-200 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsArr.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Doğal Sağlık Yolculuğunuza Başlayın
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Binlerce bitki, hastalık ve reçete bilgisine anında erişim
              sağlayın. Sağlığınız için doğanın gücünü keşfedin.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/plants"
                className="bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <span>Bitkileri Keşfet</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/diseases"
                className="border-2 border-white hover:bg-white hover:text-primary-600 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <span>Hastalık Ara</span>
                <Activity className="h-5 w-5 text-rose-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
