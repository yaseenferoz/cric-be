// backend/controllers/formController.js

const Form = require('../models/Form'); // Assuming you have a Form model defined

// Submit form
const submitForm = async (req, res) => {
    try {
        // Create a new form instance based on the request body
        const newForm = new Form(req.body);
        // Save the form to the database
        await newForm.save();
        // Send success response
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        // Check if the error is due to a duplicate key violation
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email && error.keyPattern.email === 1) {
            return res.status(400).json({ error: 'Email address is already in use' });
        } else if (error.code === 11000 && error.keyPattern && error.keyPattern.phone && error.keyPattern.phone === 1) {
            return res.status(400).json({ error: 'Phone number is already in use' });
        }
        // If it's another error, send a generic error response
        res.status(500).json({ error: 'An error occurred while submitting the form' });
    }
};

// Get all forms
const getAllForms = async (req, res) => {
    try {
        // Retrieve all forms from the database
        const forms = await Form.find();
        // Send forms as JSON response
        res.json(forms);
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({ error: 'An error occurred while retrieving forms' });
    }
};

// Get form by ID
const getFormById = async (req, res) => {
    try {
        // Retrieve form by ID from the database
        const form = await Form.findById(req.params.id);
        // If form doesn't exist, send 404 error response
        if (!form) {
            return res.status(404).json({ error: 'Form not found' });
        }
        // Send form as JSON response
        res.json(form);
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({ error: 'An error occurred while retrieving the form' });
    }
};

// Update form by ID
const updateForm = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        // Find form by ID and update it with the new data
        const updatedForm = await Form.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedForm) {
            return res.status(404).json({ error: 'Form not found' });
        }
        // Send updated form as response
        res.json(updatedForm);
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({ error: 'An error occurred while updating the form' });
    }
};

// Delete form by ID
const deleteForm = async (req, res) => {
    try {
        // Delete form from the database
        await Form.findByIdAndDelete(req.params.id);
        // Send success response
        res.json({ message: 'Form deleted successfully' });
    } catch (error) {
        // If an error occurs, send an error response
        res.status(500).json({ error: 'An error occurred while deleting the form' });
    }
};

module.exports = {
    submitForm,
    getAllForms,
    getFormById,
    updateForm,
    deleteForm
};
