const mongoose = require("mongoose");

const plantDiseaseRelationSchema = new mongoose.Schema(
  {
    plant_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plant",
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

// Aynı plant-disease kombinasyonunun tekrar oluşturulmasını engelle
plantDiseaseRelationSchema.index(
  { plant_id: 1, disease_id: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "PlantDiseaseRelation",
  plantDiseaseRelationSchema
);
