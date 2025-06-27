const mongoose = require("mongoose");

const recipeDiseaseRelationSchema = new mongoose.Schema(
  {
    recipe_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recipe",
      required: true,
    },
    disease_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Disease",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Aynı recipe-disease kombinasyonunun tekrar oluşturulmasını engelle
recipeDiseaseRelationSchema.index(
  { recipe_id: 1, disease_id: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "RecipeDiseaseRelation",
  recipeDiseaseRelationSchema
);
