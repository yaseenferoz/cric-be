// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/forms');

const app = express();

// Body parser middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb+srv://yaseenfiroz:tumkur45@cluster0.nnqznxh.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/forms', formRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
