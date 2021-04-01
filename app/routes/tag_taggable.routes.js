let express = require("express");
let router = express.Router();

let taggableController = require("../controllers/tag_taggable.controller");

router.post("/create", taggableController.create);
router.get("/all", taggableController.findAll);
router.get("/:id", taggableController.findById);
// router.get("/image/all", taggableController.allImageComment);
// router.get("/video/all", taggableController.allVideoComment);

module.exports = router;
