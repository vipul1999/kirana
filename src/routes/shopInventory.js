const express = require('express');
const Shop = require('../models/Shop');
const ShopInventory = require('../models/Inventory');
const router = express.Router();

// Add Inventory to a Shop
router.post('/:shopId/inventory', async (req, res) => {
  const { shopId } = req.params;
  const { name, quantity, price } = req.body;

  try {
    // Find the shop by its ID
    const shop = await Shop.findById(shopId);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    // Create a new inventory item
    const inventoryItem = new ShopInventory({
      name,
      quantity,
      price,
      shop: shop._id // Link inventory item to the shop
    });

    console.log(inventoryItem);
    await inventoryItem.save(); // Save inventory item

    // Send success response
    res.status(201).json(inventoryItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//inventory listing
router.get('/:shopId/inventory', async (req, res) => {
    const { shopId } = req.params;
  
    try {
      // Find all inventory items that belong to the shop
      const inventoryItems = await ShopInventory.find({ shop: shopId });
  
      if (!inventoryItems.length) {
        return res.status(404).json({ error: 'No inventory found for this shop' });
      }
  
      // Send the inventory items back in the response
      res.json({ inventoryItems });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching inventory' });
    }
  });
  
  

module.exports = router;
