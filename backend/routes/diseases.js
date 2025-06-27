const express = require("express");
const router = express.Router();
const diseaseController = require("../controllers/diseaseController");
const auth = require("../middleware/auth");

router.get("/", diseaseController.getAllDiseases);
router.get("/:id", diseaseController.getDiseaseById);
router.post("/", auth, diseaseController.createDisease);
router.put("/:id", auth, diseaseController.updateDisease);
router.delete("/:id", auth, diseaseController.deleteDisease);

module.exports = router;
