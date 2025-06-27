const express = require("express");
const jwt = require("jsonwebtoken");
const { AdminUser } = require("../models");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

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

module.exports = router;
