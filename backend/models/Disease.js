const mongoose = require("mongoose");

const diseaseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    keywords: {
      type: [String],
      default: [],
      description: "Anahtar kelime ve eşanlamlılar için.",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Disease", diseaseSchema);
