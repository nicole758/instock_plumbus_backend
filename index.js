const express = require('express');
const app = express();
const PORT = process.env.PORT || 5050;
const inventoryRoutes = require('./routes/inventoryRoutes');
const warehouseRoutes = require('./routes/warehouseRoute');



app.use(express.json());
app.use('/warehouses', warehouseRoutes);
app.use('/inventories', inventoryRoutes);


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
