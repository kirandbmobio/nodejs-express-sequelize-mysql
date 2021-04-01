const express = require("express");
const router = express.Router();
const tutorialController = require("../controllers/tutorial.controller");

// router.post("/qrcode", tutorialController.qrcode);
router.post("/create", tutorialController.create);
router.get("/all", tutorialController.findAll);
router.post("/:id", tutorialController.findOne);
router.post("/update/:id", tutorialController.update);
router.post("/delete/:id", tutorialController.delete);
router.post("/delete/all", tutorialController.deleteAll);
router.post("/published/all", tutorialController.findAllPublished);
router.get("/oneToMany", tutorialController.oneToMany);

module.exports = router;
