const express = require("express");
const jwt = require("jsonwebtoken");
const { AdminUser, Disease } = require("../models");
const authMiddleware = require("../middleware/auth");
const Fuse = require("fuse.js");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Kullanıcı kayıt
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Email kontrolü
    const existingUser = await AdminUser.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        error: "Kayıt başarısız",
        message: "Bu email adresi zaten kullanılıyor",
      });
    }

    // Yeni kullanıcı oluştur
    const user = new AdminUser({
      name,
      email,
      password,
      role: "user", // Normal kullanıcı rolü
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Kayıt başarılı",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      error: "Sunucu hatası",
      message: "Kayıt işlemi başarısız",
    });
  }
});

// Admin giriş
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kullanıcıyı bul
    const user = await AdminUser.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "Giriş başarısız",
        message: "Email veya şifre hatalı",
      });
    }

    // Şifreyi kontrol et
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Giriş başarısız",
        message: "Email veya şifre hatalı",
      });
    }

    // JWT token oluştur
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    // HTTP-only cookie olarak token'ı gönder
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
    });

    res.json({
      success: true,
      message: "Giriş başarılı",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Sunucu hatası",
      message: "Giriş işlemi başarısız",
    });
  }
});

// Admin çıkış
router.post("/logout", (req, res) => {
  // Cookie'yi temizle
  res.clearCookie("authToken");

  res.json({
    success: true,
    message: "Çıkış başarılı",
  });
});

// Mevcut kullanıcı bilgisi
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
    },
  });
});

// Admin hesabı oluştur (ilk kurulum için)
router.post("/setup", async (req, res) => {
  try {
    // Sadece hiç admin yoksa oluştur
    const adminCount = await AdminUser.countDocuments();

    if (adminCount > 0) {
      return res.status(403).json({
        error: "Erişim reddedildi",
        message: "Admin hesabı zaten mevcut",
      });
    }

    const { email, password } = req.body;

    const admin = new AdminUser({
      email,
      password,
      role: "admin",
    });

    await admin.save();

    res.json({
      success: true,
      message: "Admin hesabı oluşturuldu",
    });
  } catch (error) {
    console.error("Setup error:", error);
    res.status(500).json({
      error: "Sunucu hatası",
      message: "Admin hesabı oluşturulamadı",
    });
  }
});

// Kullanıcı listesi (sadece admin)
router.get("/users", authMiddleware, async (req, res) => {
  try {
    // Sadece admin erişimi
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Erişim reddedildi" });
    }
    const users = await AdminUser.find({}, "_id name email role createdAt");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Kullanıcılar alınamadı" });
  }
});

// Kullanıcı sayısı (sadece admin)
router.get("/users/stats", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Erişim reddedildi" });
    }
    const userCount = await AdminUser.countDocuments();
    res.json({ userCount });
  } catch (error) {
    res.status(500).json({ error: "Kullanıcı sayısı alınamadı" });
  }
});

// Kullanıcı silme (sadece admin)
router.delete("/users/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Erişim reddedildi" });
    }

    const userId = req.params.id;

    // Kendini silmeye çalışıyorsa engelle
    if (userId === req.user._id.toString()) {
      return res.status(400).json({
        error: "İşlem reddedildi",
        message: "Kendi hesabınızı silemezsiniz",
      });
    }

    const user = await AdminUser.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }

    await AdminUser.findByIdAndDelete(userId);
    res.json({ success: true, message: "Kullanıcı başarıyla silindi" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Kullanıcı silinemedi" });
  }
});

// Şifre ve e-posta değiştirme (sadece giriş yapmış kullanıcı)
router.post("/change-password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword, newEmail } = req.body;
    const user = await AdminUser.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "Kullanıcı bulunamadı" });
    }
    // Mevcut şifreyi kontrol et
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ error: "Mevcut şifre hatalı" });
    }
    // E-posta değişikliği
    if (newEmail && newEmail !== user.email) {
      const existing = await AdminUser.findOne({ email: newEmail });
      if (existing) {
        return res.status(400).json({ error: "Bu e-posta zaten kullanılıyor" });
      }
      user.email = newEmail;
    }
    // Şifre değişikliği
    if (newPassword) {
      user.password = newPassword;
    }
    await user.save();
    res.json({
      success: true,
      message: "Bilgiler başarıyla güncellendi",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Change password/email error:", error);
    res.status(500).json({ error: "Bilgiler güncellenemedi" });
  }
});

// Chat asistanı endpointi (Gemini API ile)
router.post("/chat/assist", async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Mesaj gerekli" });
  }
  try {
    // Tüm hastalıkları çek
    const diseases = await Disease.find({}, { name: 1, description: 1 });
    const diseaseList = diseases
      .map((d) => `- ${d.name}: ${d.description || ""}`)
      .join("\n");
    const prompt = `Kullanıcıdan gelen mesaj: \"${message}\".\nAşağıda sistemdeki hastalıklar ve açıklamaları var:\n${diseaseList}\nKullanıcıya en uygun hastalığı ve kısa açıklamasını öner. Eğer sistemdeki bir hastalıkla eşleşiyorsa, sadece o hastalığın adını ve kısa açıklamasını JSON olarak döndür.\nYanıt örneği: { \"disease\": \"Adet Düzensizliği\", \"description\": \"Adet döngüsünde bozukluk...\" }\nEğer hiçbir hastalıkla eşleşmiyorsa, sadece { \"disease\": null } döndür.`;
    const geminiRes = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }
    );
    const geminiText =
      geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text;
    console.log("Gemini yanıtı:", geminiText);
    let suggestion = null;
    let link = null;
    if (geminiText) {
      try {
        const parsed = JSON.parse(geminiText);
        if (parsed.disease) {
          const fuse = new Fuse(diseases, {
            keys: ["name", "keywords"],
            threshold: 0.5,
          });
          const results = fuse.search(parsed.disease);
          let matched = null;
          if (results.length > 0) {
            matched = results[0].item;
            // Otomatik keywords ekleme
            if (
              parsed.disease &&
              matched.keywords &&
              !matched.keywords
                .map((k) => k.toLowerCase())
                .includes(parsed.disease.toLowerCase())
            ) {
              matched.keywords.push(parsed.disease);
              // DB'de de güncelle
              await matched.save();
            }
          } else {
            matched = diseases[0];
          }
          suggestion = `${matched.name} ile ilgili bitkileri görmek için tıklayın.`;
          link = `/diseases/${matched._id}`;
        }
      } catch (e) {
        // JSON parse edilemezse düz metinden hastalık adını ve açıklamasını çek
        const match = geminiText.match(
          /([A-Za-zÇçĞğİıÖöŞşÜü\s]+)[:\-–—]+(.+)/i
        );
        if (match && match[1]) {
          const diseaseName = match[1].trim();
          const fuse = new Fuse(diseases, {
            keys: ["name", "keywords"],
            threshold: 0.5,
          });
          const results = fuse.search(diseaseName);
          let matched = null;
          if (results.length > 0) {
            matched = results[0].item;
            // Otomatik keywords ekleme
            if (
              diseaseName &&
              matched.keywords &&
              !matched.keywords
                .map((k) => k.toLowerCase())
                .includes(diseaseName.toLowerCase())
            ) {
              matched.keywords.push(diseaseName);
              // DB'de de güncelle
              await matched.save();
            }
          } else {
            matched = diseases[0];
          }
          suggestion = `${matched.name} ile ilgili bitkileri görmek için tıklayın.`;
          link = `/diseases/${matched._id}`;
        }
      }
    }
    return res.json({ suggestion, link });
  } catch (err) {
    console.error("Gemini API hatası:", err?.response?.data || err.message);
    return res.json({ suggestion: null });
  }
});

module.exports = router;
