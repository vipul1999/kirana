const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const shopRoutes = require('./routes/shops');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use('/api/shops', shopRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
