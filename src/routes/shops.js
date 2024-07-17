const express = require('express');
const Shop = require('../models/Shop');
const router = express.Router();

// Get all shops
router.get('/', async (req, res) => {
  let query = {}; // Initialize an empty query object

  // Check if there is a 'category' query parameter
  if (req.query.category) {
    query.services = req.query.category; // Add category filter to the query
  }

  const shops = await Shop.find(query);
  res.json(shops);
});

// Add a new shop
router.post('/', async (req, res) => {
  const shop = new Shop(req.body);
  await shop.save();
  res.status(201).send(shop);
});

// POST /api/shops/:shopId/rate
router.post('/:shopId/rate', async (req, res) => {
  const { user, rating, comment } = req.body;
  const { shopId } = req.params;

  try {
    // Find the shop by shopId
    const shop = await Shop.findById(shopId);

    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    // Validate rating value
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }

    // Add new review to the shop's reviews array
    shop.reviews.push({ user, rating, comment });

    // Calculate average rating for the shop
    const totalReviews = shop.reviews.length;
    const totalRatingSum = shop.reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRatingSum / totalReviews;

    // Update the shop with the calculated average rating
    shop.rating = averageRating;

    // Save the updated shop
    await shop.save();

    res.status(200).json({ message: 'Rating added successfully', shop });
  } catch (error) {
    console.error('Error rating shop:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
