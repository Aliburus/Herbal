const { Category } = require("../models");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Kategoriler alınamadı" });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ error: "Kategori bulunamadı" });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: "Kategori alınamadı" });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Kategori oluşturulamadı", details: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!category)
      return res.status(404).json({ error: "Kategori bulunamadı" });
    res.json(category);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Kategori güncellenemedi", details: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ error: "Kategori bulunamadı" });
    res.json({ message: "Kategori silindi" });
  } catch (err) {
    res.status(500).json({ error: "Kategori silinemedi" });
  }
};
