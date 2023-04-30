const router = require("express").Router();
const inventoryController = require("../controllers/inventoryController");

//Root fetch
router.route("/").get(inventoryController.index);

//By ID fetch
router.route("/:id").get(inventoryController.singleInventory);

module.exports = router;
