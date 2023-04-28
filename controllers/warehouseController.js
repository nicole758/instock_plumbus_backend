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
