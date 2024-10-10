//index.js
// Importing required libraries
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConnect = require("./config/database");
const app = express();
const testRoutes = require('./routes/testRoutes');
const attemptRoutes = require('./routes/attemptRoutes');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const PORT = process.env.PORT || 4000;

// CORS Configuration
app.use(
  cors({
    origin: "*",
  })
);

// Connecting to the database
dbConnect();

// Root route
app.get("/", (req, res) => {
  res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});

// Route configurations
console.log("hello");
app.use('/api/tests', testRoutes);
app.use('/api/recent-attempts', attemptRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});