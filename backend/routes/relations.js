const express = require("express");
const router = express.Router();
const relationController = require("../controllers/relationController");
const auth = require("../middleware/auth");

// Bitki-Hastalık ilişkileri
router.post("/plant-disease", auth, relationController.addPlantDiseaseRelation);
router.delete(
  "/plant-disease",
  auth,
  relationController.deletePlantDiseaseRelation
);

// Reçete-Hastalık ilişkileri
router.post(
  "/recipe-disease",
  auth,
  relationController.addRecipeDiseaseRelation
);
router.delete(
  "/recipe-disease",
  auth,
  relationController.deleteRecipeDiseaseRelation
);

module.exports = router;
