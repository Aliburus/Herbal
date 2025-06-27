const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

// Environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Header boyut limitlerini artır
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    maxAge: 86400,
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);
app.use(cookieParser());

// uploads klasörünü statik olarak sun
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/plants", require("./routes/plants"));
app.use("/api/diseases", require("./routes/diseases"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/recipes", require("./routes/recipes"));
app.use("/api/relations", require("./routes/relations"));
app.use("/api/upload", require("./routes/upload"));

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Herbal API çalışıyor",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Sunucu hatası",
    message: err.message,
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Endpoint bulunamadı",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portunda çalışıyor`);
  console.log(
    `📱 Frontend: ${process.env.FRONTEND_URL || "http://localhost:5173"}`
  );
});
