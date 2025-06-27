const express = require("express");
const router = express.Router();
const plantController = require("../controllers/plantController");
const auth = require("../middleware/auth");

router.get("/stats", plantController.getStats);
router.get("/", plantController.getAllPlants);
router.get("/:id", plantController.getPlantById);
router.post("/", auth, plantController.createPlant);
router.put("/:id", auth, plantController.updatePlant);
router.delete("/:id", auth, plantController.deletePlant);

module.exports = router;
