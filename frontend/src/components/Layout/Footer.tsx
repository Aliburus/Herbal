import React from 'react';
import { Leaf, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-primary-600 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Dijital Lokman</h3>
                <p className="text-sm text-gray-400">Bitkisel Tedavi Rehberi</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              Geleneksel bitkisel tedavi yöntemlerini modern teknoloji ile birleştirerek, 
              doğal sağlık çözümlerine kolay erişim sağlıyoruz. Sağlığınız için doğanın gücünü keşfedin.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hızlı Erişim</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/plants" className="text-gray-300 hover:text-primary-400 transition-colors">Bitkiler</a></li>
              <li><a href="/diseases" className="text-gray-300 hover:text-primary-400 transition-colors">Hastalıklar</a></li>
              <li><a href="/recipes" className="text-gray-300 hover:text-primary-400 transition-colors">Reçeteler</a></li>
              <li><a href="/search" className="text-gray-300 hover:text-primary-400 transition-colors">Arama</a></li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="text-lg font-semibold mb-4">İletişim</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">info@dijitallokman.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">+90 (212) 123 45 67</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary-400" />
                <span className="text-gray-300">İstanbul, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Bölüm */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Dijital Lokman. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Gizlilik Politikası
            </a>
            <a href="/terms" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
              Kullanım Koşulları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};