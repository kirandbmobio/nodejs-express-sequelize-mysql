let express = require("express");
let router = express.Router();

let userWorkingDayController = require("../controllers/userworkingday.controller");

router.post("/create", userWorkingDayController.create);
router.get("/all", userWorkingDayController.findAll);
// router.get("/:id", userWorkingDayController.findById);
// router.post("/update/:id", userWorkingDayController.update);

module.exports = router;
