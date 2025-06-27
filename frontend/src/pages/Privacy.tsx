import React from "react";
import { Header } from "../components/Layout/Header";
import { Footer } from "../components/Layout/Footer";

export const Privacy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-12 px-4">
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-md p-8 border border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Gizlilik Politikası
          </h1>
          <div className="prose prose-gray max-w-none mx-auto">
            <p className="text-gray-600 mb-4 text-sm text-right">
              Son güncelleme: {new Date().toLocaleDateString("tr-TR")}
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              1. Toplanan Bilgiler
            </h2>
            <p className="text-gray-700 mb-4">
              Hesap oluştururken adınız, email adresiniz ve şifreniz toplanır.
              Bu bilgiler hesabınızın yönetimi için kullanılır.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              2. Bilgi Kullanımı
            </h2>
            <p className="text-gray-700 mb-4">
              Kişisel bilgileriniz sadece hesap yönetimi ve platform
              hizmetlerinin sağlanması için kullanılır.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              3. Bilgi Paylaşımı
            </h2>
            <p className="text-gray-700 mb-4">
              Kişisel bilgileriniz üçüncü taraflarla paylaşılmaz, satılmaz veya
              kiralanmaz.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              4. Veri Güvenliği
            </h2>
            <p className="text-gray-700 mb-4">
              Bilgileriniz endüstri standardı güvenlik önlemleriyle
              korunmaktadır.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              5. Çerezler
            </h2>
            <p className="text-gray-700 mb-4">
              Platform deneyimini iyileştirmek için çerezler kullanılır.
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              6. İletişim
            </h2>
            <p className="text-gray-700 mb-4">
              Gizlilik politikamız hakkında sorularınız için bizimle iletişime
              geçebilirsiniz.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
