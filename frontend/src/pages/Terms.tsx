import React from "react";
import { Header } from "../components/Layout/Header";
import { Footer } from "../components/Layout/Footer";

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Kullanım Şartları
          </h1>
          <div className="prose prose-gray max-w-none mx-auto">
            <p className="text-gray-600 mb-4 text-sm text-right">
              Son güncelleme: {new Date().toLocaleDateString("tr-TR")}
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Hizmet Kullanımı
            </h2>
            <p className="text-gray-700 mb-4">
              Dijital Lokman platformunu kullanarak aşağıdaki şartları kabul
              etmiş olursunuz:
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Hesap Sorumluluğu
            </h2>
            <p className="text-gray-700 mb-4">
              Hesabınızın güvenliğinden siz sorumlusunuz. Şifrenizi kimseyle
              paylaşmayın.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. İçerik Kullanımı
            </h2>
            <p className="text-gray-700 mb-4">
              Platformdaki bilgiler sadece bilgilendirme amaçlıdır. Tıbbi
              tavsiye için mutlaka bir sağlık uzmanına danışın.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Gizlilik
            </h2>
            <p className="text-gray-700 mb-4">
              Kişisel bilgileriniz gizlilik politikamız kapsamında
              korunmaktadır.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Değişiklikler
            </h2>
            <p className="text-gray-700 mb-4">
              Bu şartlar önceden haber verilmeksizin değiştirilebilir.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
