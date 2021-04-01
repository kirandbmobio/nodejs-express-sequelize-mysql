let express = require("express");
let router = express.Router();

let commonController = require("../controllers/common.controller");

router.post("/addColumn/:table_name", commonController.addColumn);
router.post("/changeColumn/:table_name", commonController.changeColumn);
router.post("/deleteColumn/:table_name", commonController.deleteColumn);
router.post("/deleteTable/:table_name", commonController.deleteTable);

module.exports = router;
