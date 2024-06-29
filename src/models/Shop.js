const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  services: { type: [String], required: true },
  rating: { type: Number, default: 0 },
  reviews: [{ user: String, comment: String, rating: Number }]
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;
