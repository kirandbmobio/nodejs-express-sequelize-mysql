let express = require("express");
let router = express.Router();

let commentController = require("../controllers/comment.controller");

router.post("/create", commentController.create);
router.get("/all", commentController.findAll);
router.get("/:id", commentController.findById);
router.get("/image/all", commentController.allImageComment);
router.get("/video/all", commentController.allVideoComment);

module.exports = router;
