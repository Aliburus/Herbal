const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["main", "sub"],
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parent_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
