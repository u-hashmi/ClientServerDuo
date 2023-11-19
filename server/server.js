const express = require('express');
const cors = require('cors');
const { databaseConnection } = require('./db/database');
const dataRoutes = require('./routes/dataRoutes');
require('dotenv').config(); // Load environment variables from .env file
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors());

// Database connection
databaseConnection();

// Data routes
app.use('/', dataRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});