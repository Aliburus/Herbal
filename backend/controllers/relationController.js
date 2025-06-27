const { PlantDiseaseRelation, RecipeDiseaseRelation } = require("../models");

// Bitki-Hastalık ilişkileri
exports.addPlantDiseaseRelation = async (req, res) => {
  try {
    const { plant_id, disease_id } = req.body;
    const relation = new PlantDiseaseRelation({ plant_id, disease_id });
    await relation.save();
    res.status(201).json(relation);
  } catch (err) {
    res.status(400).json({ error: "İlişki eklenemedi", details: err.message });
  }
};

exports.deletePlantDiseaseRelation = async (req, res) => {
  try {
    const { plant_id, disease_id } = req.body;
    await PlantDiseaseRelation.findOneAndDelete({ plant_id, disease_id });
    res.json({ message: "İlişki silindi" });
  } catch (err) {
    res.status(500).json({ error: "İlişki silinemedi" });
  }
};

// Reçete-Hastalık ilişkileri
exports.addRecipeDiseaseRelation = async (req, res) => {
  try {
    const { recipe_id, disease_id } = req.body;
    const relation = new RecipeDiseaseRelation({ recipe_id, disease_id });
    await relation.save();
    res.status(201).json(relation);
  } catch (err) {
    res.status(400).json({ error: "İlişki eklenemedi", details: err.message });
  }
};

exports.deleteRecipeDiseaseRelation = async (req, res) => {
  try {
    const { recipe_id, disease_id } = req.body;
    await RecipeDiseaseRelation.findOneAndDelete({ recipe_id, disease_id });
    res.json({ message: "İlişki silindi" });
  } catch (err) {
    res.status(500).json({ error: "İlişki silinemedi" });
  }
};
