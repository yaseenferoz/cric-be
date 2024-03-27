const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/forms');

const app = express();

// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection using environment variables
const mongoURI = process.env.MONGO_URI; // Use environment variable for MongoDB URI

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 60000, // Increase connection timeout to 60 seconds
  })
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/forms', formRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
