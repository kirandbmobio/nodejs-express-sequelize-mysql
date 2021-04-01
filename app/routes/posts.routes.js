let express = require("express");
let router = express.Router();

let postsController = require("../controllers/posts.controller");
let postTagController = require("../controllers/post_tag.controller");

router.post("/create", postsController.create);
router.get("/all", postsController.findAll);
router.get("/:id", postsController.findById);
router.get("/many/manyToMany", postsController.manyToMany);
router.post("/tag/create", postTagController.create);
router.get("/tag/all", postTagController.findAll);
router.get("/tag/:id", postTagController.findById);

module.exports = router;
