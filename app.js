const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/forms');
const multer = require('multer');
const cors = require('cors');
const app = express();
const AWS = require('aws-sdk');

// Configure Multer for handling file uploads
const upload = multer();

AWS.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: 'ap-south-1'
});

// Middleware for handling file uploads
app.use(upload.single('photo'));
app.use(cors());
// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection
const mongoURI = "mongodb+srv://yaseenfiroz:tumkur45@cluster0.nnqznxh.mongodb.net/" 

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err)); // Log MongoDB connection error

// Log each HTTP request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/forms', formRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('An error occurred:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
