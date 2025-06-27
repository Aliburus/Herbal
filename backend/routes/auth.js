const express = require("express");
const jwt = require("jsonwebtoken");
const { AdminUser } = require("../models");
const authMiddleware = require("../middleware/auth");

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

module.exports = router;
