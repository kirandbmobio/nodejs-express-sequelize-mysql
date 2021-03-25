let express = require("express");
let router = express.Router();

let workingDayController = require("../controllers/workingday.controller");

router.post("/create", workingDayController.create);
router.get("/all", workingDayController.findAll);
router.get("/:id", workingDayController.findById);
router.post("/update/:id", workingDayController.update);

module.exports = router;
