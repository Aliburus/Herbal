# 🌿 Dijital Lokman Hekim

Bitkisel tedavi yöntemlerini dijital ortama taşıyan, modern ve tam entegre bir web uygulaması. Kullanıcılar, hastalıklara iyi gelen bitkileri ve bitkilerin hangi hastalıklarda kullanıldığını arayabilir. Admin paneli ile tüm içerik ve ilişkiler kolayca yönetilir. **Tüm arayüz ve yönetim paneli Türkçe'dir.**

## 🚀 Öne Çıkan Özellikler

- **Modern, responsive ve kullanıcı dostu admin paneli** (sidebar, dashboard, grid)
- **Dosya upload ve görsel yönetimi** (bitki fotoğrafları, sürükle-bırak, önizleme)
- **Bitki, hastalık, reçete için tam CRUD** (ekle, düzenle, sil)
- **Bitki-hastalık ve reçete-hastalık ilişkileri** (çoklu seçim, ilişkiler sayfası)
- **Gerçek zamanlı istatistikler** (dashboard'da canlı API verisi)
- **Tıklanabilir ve şık "Son Eklenenler" kutuları**
- **Arama ve filtreleme** (yazarken filtreleme, hızlı erişim)
- **JWT tabanlı admin authentication**
- **Gizlilik ve Kullanım Şartları sayfaları**
- **Tamamen Türkçe arayüz ve yönetim**

## 🎯 Özellikler

### 🔍 Kullanıcı Özellikleri

- **Bitki Arama**: Hastalığa göre bitki arama
- **Hastalık Arama**: Bitkiye göre hastalık arama
- **Detaylı Bilgiler**: Bitki ve hastalık detay sayfaları
- **İlişkili İçerik**: Bitkilerin hangi hastalıklarda kullanıldığı
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

### 👨‍⚕️ Admin Paneli

- **Bitki Yönetimi**: CRUD işlemleri (Ekleme, Düzenleme, Silme)
- **Hastalık Yönetimi**: CRUD işlemleri
- **Reçete Yönetimi**: CRUD işlemleri
- **İlişki Yönetimi**: Bitki ↔ Hastalık ilişkileri
- **Güvenli Giriş**: JWT tabanlı authentication

## 🛠️ Teknolojiler

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Multer

## 📦 Kurulum & Çalıştırma

```bash
# Backend
cd backend
npm install
npm start

# Frontend
cd frontend
npm install
npm run dev
```

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5173`

## 📁 .env Örneği (backend)

```
MONGODB_URI=mongodb://localhost:27017/herbal
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## 📊 Veritabanı Şeması (Güncel)

### Bitki (Plant)

```js
{
  name: String,
  description: String,
  usage: String,
  image: String, // sadece dosya adı
}
```

### Hastalık (Disease)

```js
{
  name: String,
  description: String,
}
```

### Reçete (Recipe)

```js
{
  title: String,
  content: String,
  usage: String,
}
```

### İlişkiler (Relation)

- **PlantDiseaseRelation:** plant_id, disease_id
- **RecipeDiseaseRelation:** recipe_id, disease_id

## 🔗 API Endpointleri (Özet)

- `/api/plants` (GET, POST, PUT, DELETE)
- `/api/diseases` (GET, POST, PUT, DELETE)
- `/api/recipes` (GET, POST, PUT, DELETE)
- `/api/relations` (ilişki yönetimi)
- `/api/upload/image` (dosya yükleme)
- `/api/auth/login` (giriş)

## 👨‍⚕️ Admin Paneli

- **Dashboard:** Son eklenenler, istatistikler, hızlı erişim
- **Bitki/Hastalık/Reçete Yönetimi:** CRUD, arama, görsel
- **İlişki Yönetimi:** Accordion/expandable, çoklu seçim
- **Responsive:** Mobil ve masaüstü uyumlu
- **Tüm içerik gerçek API ile senkronize**

## 🎨 Kullanıcı Arayüzü

- **Bitkiler, hastalıklar, reçeteler**: Liste, detay, arama
- **Tıklanabilir kartlar ve kutular**
- **Görsel ve işlevsel olarak optimize**

## 📝 Notlar

- `TODO.md` dosyası repoya dahil edilmez.
- Tüm görseller `/uploads/` klasöründe saklanır.
- Kayıtlı görseller sadece dosya adı olarak tutulur.

---

Her türlü katkı ve geri bildirim için PR ve issue açabilirsiniz!

## 🔐 API Endpoints

### Bitkiler

- `GET /api/plants` - Tüm bitkileri listele
- `GET /api/plants/:id` - Bitki detayı
- `GET /api/plants/stats` - İstatistikler
- `POST /api/plants` - Yeni bitki ekle (Admin)
- `PUT /api/plants/:id` - Bitki güncelle (Admin)
- `DELETE /api/plants/:id` - Bitki sil (Admin)

### Hastalıklar

- `GET /api/diseases` - Tüm hastalıkları listele
- `GET /api/diseases/:id` - Hastalık detayı
- `POST /api/diseases` - Yeni hastalık ekle (Admin)
- `PUT /api/diseases/:id` - Hastalık güncelle (Admin)
- `DELETE /api/diseases/:id` - Hastalık sil (Admin)

### Reçeteler

- `GET /api/recipes` - Tüm reçeteleri listele
- `GET /api/recipes/:id` - Reçete detayı
- `POST /api/recipes` - Yeni reçete ekle (Admin)
- `PUT /api/recipes/:id` - Reçete güncelle (Admin)
- `DELETE /api/recipes/:id` - Reçete sil (Admin)

### Authentication

- `POST /api/auth/login` - Admin girişi
- `POST /api/auth/register` - Admin kaydı

## 📱 Sayfa Yapısı

### Kullanıcı Sayfaları

- **Ana Sayfa**: Tanıtım ve istatistikler
- **Bitkiler**: Bitki listesi ve arama
- **Bitki Detay**: Bitki bilgileri ve ilişkili hastalıklar
- **Hastalıklar**: Hastalık listesi ve arama
- **Hastalık Detay**: Hastalık bilgileri ve ilişkili bitkiler

### Admin Sayfaları

- **Admin Giriş**: Authentication
- **Admin Dashboard**: Genel bakış
- **Bitki Yönetimi**: CRUD işlemleri
- **Hastalık Yönetimi**: CRUD işlemleri
- **Reçete Yönetimi**: CRUD işlemleri

## 🎨 UI/UX Özellikleri

- **Modern Tasarım**: Tailwind CSS ile responsive tasarım
- **Arama Fonksiyonu**: Gerçek zamanlı arama
- **Kart Tasarımı**: Bitki ve hastalık kartları
- **Detay Sayfaları**: Genişletilebilir açıklamalar
- **Loading States**: Yükleme animasyonları
- **Error Handling**: Hata yönetimi

## 🔧 Geliştirme

### Kod Yapısı

```
herbal/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── uploads/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── public/
└── README.md
```

### Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👥 Geliştirici

Bu proje bitkisel tedavi bilgilerini dijital ortama taşımak amacıyla geliştirilmiştir.

## 📞 İletişim

Proje hakkında sorularınız için issue açabilirsiniz.

---

**Not**: Bu uygulama sadece bilgilendirme amaçlıdır. Tıbbi tavsiye için mutlaka uzman doktorunuza danışınız.
