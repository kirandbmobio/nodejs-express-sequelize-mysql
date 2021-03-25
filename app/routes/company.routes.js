let express = require("express");
let router = express.Router();

let companyController = require("../controllers/company.controller");

router.post("/create", companyController.create);
router.get("/all", companyController.findAll);
router.get("/:id", companyController.findById);

module.exports = router;
