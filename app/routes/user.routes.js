let express = require("express");
let router = express.Router();

let userController = require("../controllers/user.controller");

router.post("/create", userController.create);
router.get("/all", userController.findAll);
router.get("/:id", userController.findById);
router.post("/update/:id", userController.update);

module.exports = router;
