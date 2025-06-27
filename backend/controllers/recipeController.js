const { Recipe, RecipeDiseaseRelation } = require("../models");

exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    const allRelations = await RecipeDiseaseRelation.find();
    const mappedRecipes = recipes.map((recipe) => {
      const relations = allRelations.filter(
        (r) => r.recipe_id.toString() === recipe._id.toString()
      );
      return {
        id: recipe._id,
        title: recipe.title,
        content: recipe.content,
        usage: recipe.usage,
        diseases: relations.map((r) => r.disease_id),
        diseaseCount: relations.length,
      };
    });
    res.json(mappedRecipes);
  } catch (err) {
    res.status(500).json({ error: "Reçeteler alınamadı" });
  }
};

exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Reçete bulunamadı" });

    // İlişkili hastalıkları bul
    const relations = await RecipeDiseaseRelation.find({
      recipe_id: recipe._id,
    });
    const diseaseIds = relations.map((r) => r.disease_id);
    const Disease = require("../models").Disease;
    const diseases = await Disease.find({ _id: { $in: diseaseIds } });

    res.json({
      ...recipe.toObject(),
      id: recipe._id,
      diseases,
      diseaseIds: diseaseIds,
    });
  } catch (err) {
    res.status(500).json({ error: "Reçete alınamadı" });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const { diseaseIds, ...recipeData } = req.body;
    const recipe = new Recipe(recipeData);
    await recipe.save();

    // İlişkili hastalıkları kaydet
    if (diseaseIds && Array.isArray(diseaseIds)) {
      const relations = diseaseIds.map((diseaseId) => ({
        recipe_id: recipe._id,
        disease_id: diseaseId,
      }));
      await RecipeDiseaseRelation.insertMany(relations);
    }

    res.status(201).json(recipe);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Reçete oluşturulamadı", details: err.message });
  }
};

exports.updateRecipe = async (req, res) => {
  try {
    const { diseaseIds, ...recipeData } = req.body;
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, recipeData, {
      new: true,
    });
    if (!recipe) return res.status(404).json({ error: "Reçete bulunamadı" });

    // Mevcut ilişkileri sil
    await RecipeDiseaseRelation.deleteMany({ recipe_id: recipe._id });

    // Yeni ilişkileri kaydet
    if (diseaseIds && Array.isArray(diseaseIds)) {
      const relations = diseaseIds.map((diseaseId) => ({
        recipe_id: recipe._id,
        disease_id: diseaseId,
      }));
      await RecipeDiseaseRelation.insertMany(relations);
    }

    res.json(recipe);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Reçete güncellenemedi", details: err.message });
  }
};

exports.deleteRecipe = async (req, res) => {
  try {
    // Önce ilişkili kayıtları sil
    await RecipeDiseaseRelation.deleteMany({ recipe_id: req.params.id });

    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Reçete bulunamadı" });
    res.json({ message: "Reçete silindi" });
  } catch (err) {
    res.status(500).json({ error: "Reçete silinemedi" });
  }
};
