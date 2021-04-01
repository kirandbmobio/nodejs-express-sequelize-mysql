let express = require("express");
let router = express.Router();

let imageController = require("../controllers/image.controller");

router.post("/create", imageController.create);
router.get("/all", imageController.findAll);
router.get("/:id", imageController.findById);
router.get("/tag/all", imageController.findImageWithTag);

module.exports = router;
