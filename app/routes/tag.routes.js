let express = require("express");
let router = express.Router();

let tagsController = require("../controllers/tag.controller");

router.post("/create", tagsController.create);
router.get("/all", tagsController.findAll);
router.get("/:id", tagsController.findById);
router.get("/image_video/all", tagsController.tagToVideoOrImage);

module.exports = router;
