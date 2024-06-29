const express = require('express');
const Shop = require('../models/Shop');
const router = express.Router();

// Get all shops
router.get('/', async (req, res) => {
  const shops = await Shop.find();
  res.json(shops);
});

// Add a new shop
router.post('/', async (req, res) => {
  const shop = new Shop(req.body);
  await shop.save();
  res.status(201).send(shop);
});

module.exports = router;
