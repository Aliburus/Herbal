const jwt = require("jsonwebtoken");
const { AdminUser } = require("../models");

const authMiddleware = async (req, res, next) => {
  try {
    // Cookie'den token'ı al
    const token = req.cookies.authToken;

    if (!token) {
      return res.status(401).json({
        error: "Yetkilendirme gerekli",
        message: "Giriş yapmanız gerekiyor",
      });
    }

    // Token'ı doğrula
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Kullanıcıyı bul
    const user = await AdminUser.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        error: "Geçersiz token",
        message: "Kullanıcı bulunamadı",
      });
    }

    // Request'e kullanıcı bilgisini ekle
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      error: "Geçersiz token",
      message: "Token doğrulanamadı",
    });
  }
};

module.exports = authMiddleware;
