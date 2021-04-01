let express = require("express");
let router = express.Router();

let videoController = require("../controllers/video.controller");

router.post("/create", videoController.create);
router.get("/all", videoController.findAll);
router.get("/:id", videoController.findById);
router.get("/tag/all", videoController.findVideoWithTag);
router.delete("/delete/:id", videoController.deleteVideo);
router.get("/restore/:id", videoController.restoreVideo);

module.exports = router;
