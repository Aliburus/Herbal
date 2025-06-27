const { Disease, PlantDiseaseRelation } = require("../models");

exports.getAllDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find().populate("category");
    // Tüm ilişkileri çek
    const allRelations = await PlantDiseaseRelation.find();
    // Her hastalığa ilişkili bitki sayısı ekle
    const mappedDiseases = diseases.map((disease) => {
      const relatedPlants = allRelations.filter(
        (rel) => rel.disease_id.toString() === disease._id.toString()
      );
      return {
        ...disease.toObject(),
        id: disease._id,
        relatedPlantCount: relatedPlants.length,
      };
    });
    res.json(mappedDiseases);
  } catch (err) {
    res.status(500).json({ error: "Hastalıklar alınamadı" });
  }
};

exports.getDiseaseById = async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id).populate("category");
    if (!disease) return res.status(404).json({ error: "Hastalık bulunamadı" });

    // İlişkili bitkileri bul
    const relations = await PlantDiseaseRelation.find({
      disease_id: disease._id,
    });
    const plantIds = relations.map((r) => r.plant_id);
    const plants = await require("../models").Plant.find({
      _id: { $in: plantIds },
    });

    // İlişkili reçeteleri bul
    const RecipeDiseaseRelation = require("../models").RecipeDiseaseRelation;
    const recipeRelations = await RecipeDiseaseRelation.find({
      disease_id: disease._id,
    });
    const recipeIds = recipeRelations.map((r) => r.recipe_id);
    const recipes = await require("../models").Recipe.find({
      _id: { $in: recipeIds },
    });

    res.json({
      ...disease.toObject(),
      id: disease._id,
      plants: plants,
      plantIds: plantIds,
      recipes,
    });
  } catch (err) {
    res.status(500).json({ error: "Hastalık alınamadı" });
  }
};

exports.createDisease = async (req, res) => {
  try {
    const { plantIds, ...diseaseData } = req.body;
    const disease = new Disease(diseaseData);
    await disease.save();

    // İlişkili bitkileri kaydet
    if (plantIds && Array.isArray(plantIds)) {
      const relations = plantIds.map((plantId) => ({
        plant_id: plantId,
        disease_id: disease._id,
      }));
      await PlantDiseaseRelation.insertMany(relations);
    }

    res.status(201).json(disease);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Hastalık oluşturulamadı", details: err.message });
  }
};

exports.updateDisease = async (req, res) => {
  try {
    const { plantIds, ...diseaseData } = req.body;
    const disease = await Disease.findByIdAndUpdate(
      req.params.id,
      diseaseData,
      {
        new: true,
      }
    );
    if (!disease) return res.status(404).json({ error: "Hastalık bulunamadı" });

    // Mevcut ilişkileri sil
    await PlantDiseaseRelation.deleteMany({ disease_id: disease._id });

    // Yeni ilişkileri kaydet
    if (plantIds && Array.isArray(plantIds)) {
      const relations = plantIds.map((plantId) => ({
        plant_id: plantId,
        disease_id: disease._id,
      }));
      await PlantDiseaseRelation.insertMany(relations);
    }

    res.json(disease);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Hastalık güncellenemedi", details: err.message });
  }
};

exports.deleteDisease = async (req, res) => {
  try {
    // Önce ilişkili kayıtları sil
    await PlantDiseaseRelation.deleteMany({ disease_id: req.params.id });

    const disease = await Disease.findByIdAndDelete(req.params.id);
    if (!disease) return res.status(404).json({ error: "Hastalık bulunamadı" });
    res.json({ message: "Hastalık silindi" });
  } catch (err) {
    res.status(500).json({ error: "Hastalık silinemedi" });
  }
};
