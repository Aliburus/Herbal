# 🌿 Dijital Lokman Hekim

Bitkisel tedavi yöntemlerini dijital ortama taşıyan modern web uygulaması. Kullanıcılar, belirli hastalıklara hangi bitkilerin iyi geldiğini ve bitkilerin hangi hastalıklarda kullanıldığını arayabilir. Sistem, reçeteler ve önerilerle bu bilgileri destekler.

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

## 🛠️ Teknoloji Stack

### Frontend

- **React.js** - Modern UI framework
- **TypeScript** - Tip güvenliği
- **Vite** - Hızlı build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Sayfa yönlendirme

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL veritabanı
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Multer** - Dosya yükleme

## 📦 Kurulum

### Gereksinimler

- Node.js (v16 veya üzeri)
- MongoDB
- npm veya yarn

### Backend Kurulumu

```bash
cd backend
npm install
```

### Frontend Kurulumu

```bash
cd frontend
npm install
```

### Environment Variables

Backend klasöründe `.env` dosyası oluşturun:

```env
MONGODB_URI=mongodb://localhost:27017/herbal
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## 🚀 Çalıştırma

### Backend

```bash
cd backend
npm start
```

### Frontend

```bash
cd frontend
npm run dev
```

Uygulama `http://localhost:5173` adresinde çalışacaktır.

## 📊 Veritabanı Yapısı

### Koleksiyonlar

#### Plants (Bitkiler)

```javascript
{
  name: String,
  description: String,
  usage: String,
  group: String,
  image: String,
  diseases: [String]
}
```

#### Diseases (Hastalıklar)

```javascript
{
  name: String,
  description: String,
  category: String,
  relatedPlants: [String],
  relatedRecipes: [String]
}
```

#### Recipes (Reçeteler)

```javascript
{
  title: String,
  content: String,
  usage: String,
  diseases: [String]
}
```

#### AdminUsers (Admin Kullanıcılar)

```javascript
{
  email: String,
  password: String,
  role: String
}
```

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
