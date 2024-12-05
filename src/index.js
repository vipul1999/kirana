const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const shopRoutes = require('./routes/shops');
const shopInventoryRoutes = require('./routes/shopInventory'); // Import the routes
const noteRoutes = require('./routes/NoteKeeper')
const cors = require('cors');

// Use CORS middleware

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use('/api/shops', shopRoutes);
app.use('/api/shipInventory',shopInventoryRoutes);
app.use('/api/notes/', noteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('Health check OK');
});
