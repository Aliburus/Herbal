const {
  Plant,
  Disease,
  PlantDiseaseRelation,
  Recipe,
  RecipeDiseaseRelation,
} = require("../models");

exports.getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    const allRelations = await PlantDiseaseRelation.find();
    const mappedPlants = plants.map((plant) => {
      const relations = allRelations.filter(
        (r) => r.plant_id.toString() === plant._id.toString()
      );

      // Resim yolunu düzelt - uploads/ prefix'ini kaldır
      let imagePath = plant.image;
      if (imagePath && imagePath.startsWith("uploads/")) {
        imagePath = imagePath.replace("uploads/", "");
      }

      return {
        id: plant._id,
        name: plant.name,
        description: plant.description,
        usage: plant.usage,
        image: imagePath,
        diseases: relations.map((r) => r.disease_id),
        diseaseCount: relations.length,
      };
    });
    res.json(mappedPlants);
  } catch (err) {
    res.status(500).json({ error: "Bitkiler alınamadı" });
  }
};

exports.getPlantById = async (req, res) => {
  try {
    const plant = await Plant.findById(req.params.id);
    if (!plant) return res.status(404).json({ error: "Bitki bulunamadı" });

    // İlişkili hastalıkları bul
    const relations = await PlantDiseaseRelation.find({ plant_id: plant._id });
    const diseaseIds = relations.map((r) => r.disease_id);
    let diseases = await Disease.find({ _id: { $in: diseaseIds } }).populate(
      "category"
    );
    diseases = diseases.map((d) => ({ ...d.toObject(), id: d._id }));

    // İlişkili reçeteleri bul (hastalıklar üzerinden)
    const recipeRelations = await RecipeDiseaseRelation.find({
      disease_id: { $in: diseaseIds },
    });
    const recipeIds = recipeRelations.map((r) => r.recipe_id);
    const recipes = await Recipe.find({ _id: { $in: recipeIds } });

    // Resim yolunu düzelt - uploads/ prefix'ini kaldır
    let imagePath = plant.image;
    if (imagePath && imagePath.startsWith("uploads/")) {
      imagePath = imagePath.replace("uploads/", "");
    }

    res.json({
      ...plant.toObject(),
      image: imagePath,
      diseases,
      recipes,
    });
  } catch (err) {
    res.status(500).json({ error: "Bitki alınamadı" });
  }
};

exports.createPlant = async (req, res) => {
  try {
    const plant = new Plant(req.body);
    await plant.save();
    res.status(201).json(plant);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Bitki oluşturulamadı", details: err.message });
  }
};

exports.updatePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!plant) return res.status(404).json({ error: "Bitki bulunamadı" });
    res.json(plant);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Bitki güncellenemedi", details: err.message });
  }
};

exports.deletePlant = async (req, res) => {
  try {
    const plant = await Plant.findByIdAndDelete(req.params.id);
    if (!plant) return res.status(404).json({ error: "Bitki bulunamadı" });
    res.json({ message: "Bitki silindi" });
  } catch (err) {
    res.status(500).json({ error: "Bitki silinemedi" });
  }
};

exports.getStats = async (req, res) => {
  try {
    const plantCount = await Plant.countDocuments();
    const diseaseCount = await Disease.countDocuments();
    const recipeCount = await Recipe.countDocuments();
    res.json({ plantCount, diseaseCount, recipeCount });
  } catch (err) {
    res.status(500).json({ error: "İstatistikler alınamadı" });
  }
};
