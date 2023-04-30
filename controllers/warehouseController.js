const knex = require('knex')(require('../knexfile'));

exports.updateWarehouse = (req, res) => {
    knex('warehouses')
        .update(req.body)
        .where({ id: req.params.id })
        .then(() => {
            res.status(200).send(`Warehouse with id: ${req.params.id} has been updated`);
        })
        .catch((err) =>
            res.status(400).send(`Error updating Warehouse ${req.params.id} ${err}`)
        );
};



//delete a warehouse from the list
exports.deleteWarehouse = (req, res) => {
    knex('warehouses')
        .delete()
        .where({ id: req.params.id })
        .then(() => {
            res.status(204).send(`Warehouse with id: ${req.params.id} has been deleted`);
        })
        .catch((err) =>
            res.status(400).send(`Error deleting Warehouse ${req.params.id} ${err}`)
        );
};