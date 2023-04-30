const knex = require('knex')(require('../knexfile'));
const { v4: uuidv4 } = require('uuid');

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

exports.addWarehouse = (req, res) => {
    // Validate the request body for required data
    if (!req.body.warehouse_name || !req.body.address || !req.body.city|| !req.body.country || !req.body.contact_name || !req.body.contact_position || !req.body.contact_phone || !req.body.contact_email) {
        return res.status(400).send('Please make sure to provide name,address,city,country,contactName,position,phoneNumber,email fields in a request');
    }

    const id = uuidv4();
    knex('warehouses')
        .insert({...req.body, id })
        .then(() => {
            // For POST requests we need to respond with 201 and the location of the newly created record
            const newWarehouseURL = `/warehouses/${id}`;
            res.status(201).location(newWarehouseURL).send(newWarehouseURL);
        })
        .catch((err) => res.status(400).send(`Error creating Warehouse: ${err}`));
};


