const AWS = require('aws-sdk'); // Import AWS SDK
const Form = require('../models/Form'); // Assuming you have a Form model defined
// Submit form
const submitForm = async (req, res) => {
    try {
        console.log('Received form submission request');
        const photo = req.file; // Assuming you're using multer or similar middleware for file uploads
        console.log('Received photo:', photo);

        // Log the content of photo.buffer
        console.log('Photo buffer content:', photo.buffer);

        // AWS S3 upload parameters
        const uploadParams = {
            Bucket: 'cricbe',
            Key: photo.originalname,
            Body: photo.buffer // Assuming photo is received as buffer
        };

        // Create S3 object
        const s3 = new AWS.S3();

        // Upload photo to S3
        const uploadResult = await s3.upload(uploadParams).promise();

        // Save photo URL to database
        const newForm = new Form({
            ...req.body,
            photo: uploadResult.Location // Save S3 object URL to photo field in the form
        });

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
        console.error('Error occurred while submitting form:', error);
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
