const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    category: String,
    shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true }
  });
  
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
