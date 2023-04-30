const router = require('express').Router();
const warehouseController = require('../controllers/warehouseController');

router
    .route('/:id')
    // .get(warehouseController.singleWarehouse)
    // .put(warehouseController.updateWarehouse)
    .delete(warehouseController.deleteWarehouse);

    module.exports = router;
