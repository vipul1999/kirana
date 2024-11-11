const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
    category: String,
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' }
  });
  
const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;
