const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const {
  Plant,
  Disease,
  Category,
  PlantDiseaseRelation,
  Recipe,
  RecipeDiseaseRelation,
} = require("./models");

dotenv.config();

async function seed() {
  await connectDB();

  // Veritabanını temizle
  await Plant.deleteMany();
  await Disease.deleteMany();
  await Category.deleteMany();
  await PlantDiseaseRelation.deleteMany();
  await Recipe.deleteMany();
  await RecipeDiseaseRelation.deleteMany();

  // Kategoriler (örnek: hepsi ana kategori olarak eklenecek)
  const mainCategory = new Category({
    type: "main",
    name: "Genel",
    parent_id: null,
  });
  await mainCategory.save();

  // Hastalıkları ve reçeteleri toplamak için set
  const diseaseMap = new Map();
  const recipeMap = new Map();

  // db-converted.json oku
  const data = JSON.parse(
    fs.readFileSync(path.join(__dirname, "db-converted.json"), "utf-8")
  );

  // Hastalıkları topla ve açıklamalarını eşleştir
  data.forEach((item) => {
    if (item.diseases) {
      item.diseases.forEach((disease) => {
        if (!diseaseMap.has(disease)) {
          // Açıklama olarak bitkinin description'ını kullan
          diseaseMap.set(
            disease,
            item.description ||
              "Bu hastalık için bitkisel tedavi yöntemleri kullanılabilir."
          );
        }
      });
    }
  });

  // Hastalıkları ekle
  for (const [diseaseName, diseaseDesc] of diseaseMap.entries()) {
    const disease = new Disease({
      name: diseaseName,
      description: diseaseDesc,
      category: mainCategory._id,
    });
    await disease.save();
    diseaseMap.set(diseaseName, disease);
  }

  // Reçeteleri topla ve ekle
  data.forEach((item) => {
    if (item.prescriptions) {
      item.prescriptions.forEach((pres) => {
        const title = pres.prescription_name || pres.title;
        const content = pres.description || pres.content;
        if (title && !recipeMap.has(title)) {
          const recipe = new Recipe({
            title,
            content,
            usage: pres.usage || "Kullanım bilgisi bulunamadı.",
          });
          recipe.save();
          recipeMap.set(title, recipe);
        }
      });
    }
  });

  // Bitkileri ekle
  for (const item of data) {
    const plant = new Plant({
      name: item.name,
      description: item.description || "Açıklama bulunamadı.",
      usage: item.usage || "Kullanım bilgisi bulunamadı.",
      image: item.image,
    });
    await plant.save();

    // Bitki-Hastalık ilişkileri
    if (item.diseases) {
      for (const diseaseName of item.diseases) {
        const disease = diseaseMap.get(diseaseName);
        if (disease) {
          await new PlantDiseaseRelation({
            plant_id: plant._id,
            disease_id: disease._id,
          }).save();
        }
      }
    }

    // Bitki-Reçete ilişkisi (reçete-hastalık ilişkisi de ekleniyor)
    if (item.prescriptions) {
      for (const pres of item.prescriptions) {
        const title = pres.prescription_name || pres.title;
        const recipe = await Recipe.findOne({ title });
        if (recipe && item.diseases) {
          for (const diseaseName of item.diseases) {
            const disease = diseaseMap.get(diseaseName);
            if (disease) {
              await new RecipeDiseaseRelation({
                recipe_id: recipe._id,
                disease_id: disease._id,
              }).save();
            }
          }
        }
      }
    }
  }

  console.log("Seed işlemi tamamlandı!");
  process.exit(0);
}

seed();
