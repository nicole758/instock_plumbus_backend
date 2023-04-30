const knex = require("knex")(require("../knexfile"));

exports.index = (_req, res) => {
  knex("inventories")
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving Inventories: ${err}`)
    );
};

exports.singleInventory = (req, res) => {
  knex("inventories")
    .where({ id: req.params.id })
    .then((data) => {
      // If record is not found, respond with 404
      if (!data.length) {
        return res
          .status(404)
          .send(`Record with id: ${req.params.id} is not found`);
      }
      // Knex returns an array of records, so we need to send response with a single object only
      res.status(200).json(data[0]);
    })
    .catch((err) =>
      res.status(400).send(`Error retrieving inventory ${req.params.id} ${err}`)
    );
};

exports.updateInventory = (req, res) => {
  knex("inventories")
    .update(req.body)
    .where({ id: req.params.id })
    .then(() => {
      res
        .status(200)
        .send(`Inventory with id: ${req.params.id} has been updated`);
    })
    .catch((err) =>
      res.status(400).send(`Error updating inventory ${req.params.id} ${err}`)
    );
};

exports.addInventory = (req, res) => {
    // Validate the request body for required data
    if (!req.body.warehouse_id || !req.body.item_name || !req.body.description|| !req.body.category || !req.body.status || !req.body.quantity) {
        return res.status(400).send('Please make sure to provide all required fields');
    }

    const id = uuidv4();
    knex('inventories')
        .insert({...req.body, id })
        .then((data) => {
            // For POST requests we need to respond with 201 and the location of the newly created record
            const newInventoryURL = `/inventories/${id}`;
            res.status(201).location(newInventoryURL).send(newInventoryURL);
        })
        .catch((err) => res.status(400).send(`Error creating Inventory: ${err}`));
};

