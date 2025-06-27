# 📄 prd.md – Dijital Lokman Hekim ## 🎯 Amaç

Bitkisel tedavi yöntemlerini dijital ortama taşımak. Kullanıcılar, belirli hastalıklara hangi bitkilerin iyi geldiğini ve aynı şekilde bitkilerin hangi hastalıklarda kullanıldığını arayabilecek. Sistem, reçeteler ve önerilerle bu bilgileri destekleyecek.

## 🧩 Temel Özellikler ### 🔎 Arama Özellikleri (Kullanıcı)

Bitkiye göre hastalık arama
Hastalığa göre bitki arama
Reçeteye göre arama

### 👨‍⚕️ Yönetim (Admin Paneli)

Bitki kaydı (isim, açıklama, fotoğraf, kullanım şekli, grubu)
Hastalık kaydı (isim, açıklama, kategorisi)
Bitki ↔ Hastalık ilişkisi tanımlama
Reçete oluşturma (içerik, kullanım şekli, önerilen hastalıklar)
Reçete ↔ Hastalık ilişkisi tanımlama
Verileri güncelleme ve silme (CRUD)

## 🗃️ Veritabanı Tasarımı (MongoDB) ### Koleksiyonlar (Collection)

plants

name (string)
description (string)
usage (string)
group (ref: categories)
image (string)
diseases

name (string)
description (string)
category (ref: categories)
categories

type: main | sub
name (string)
parent_id (nullable, for sub-groups)
plant_disease_relations

plant_id (ref: plants)
disease_id (ref: diseases)
recipes

title (string)
content (string)
usage (string)
recipe_disease_relations

recipe_id (ref: recipes)
disease_id (ref: diseases)
admin_users

email, password, role

## 🧑‍💻 Teknoloji Stack

Frontend: React.js (Vite) + Tailwind CSS
Backend: Node.js + Express.js
Veritabanı: MongoDB (Mongoose ODM)
Authentication: JWT (Admin giriş sistemi)
Mobil (Opsiyonel): React Native / Expo

## 🖥️ Arayüz (UI) ### Kullanıcı Arayüzü

Ana Sayfa (Tanıtım)
Bitki Arama Sayfası
Hastalık Arama Sayfası
Reçete Listesi
Bitki Detayları
Hastalık Detayları
Reçete Detayları

### Admin Paneli

Admin Giriş Sayfası
Bitki Yönetimi (CRUD)
Hastalık Yönetimi (CRUD)
Reçete Yönetimi (CRUD)
İlişki Yönetimi (bitki ↔ hastalık, reçete ↔ hastalık)

## 🔐 Roller

admin: Tüm içerik ve ilişki yönetimi işlemlerini yapar.
user: Arama yapabilir, bitki/hastalık/reçete detaylarını görüntüleyebilir.

## 📅 Teslimat Takvimi (Örnek)

1. Hafta: Proje analizi ve MongoDB şema tasarımı
2. Hafta: Backend API’lerinin yazılması (Express.js)
3. Hafta: React frontend (kullanıcı arayüzü) geliştirme
4. Hafta: Admin paneli oluşturma ve entegrasyon
5. Hafta: Test, düzeltmeler ve opsiyonel mobil uyarlama

## 📌 Notlar

Veri seti ilk etapta örnek verilerle dolu olabilir.
Gerçek reçete verileri araştırılarak eklenebilir.
Geliştirme sırasında JWT ile korunan bir admin paneli zorunludur. admin paneliyle birlikte yaparmısın
