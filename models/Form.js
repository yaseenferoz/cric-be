// backend/models/Form.js

const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true // Ensure unique phone numbers
    },
    villageName: {
        type: String,
        required: true
    },
    playerType: {
        type: String,
        enum: ['Batsman', 'Bowler', 'All-Rounder'], // Assuming player types are predefined
        required: true
    },
    photo: String // Assuming photo upload is optional
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
