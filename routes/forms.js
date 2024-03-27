// routes/forms.js

const express = require('express');
const router = express.Router();
const formController = require('../controllers/formController');

// POST /api/forms
router.post('/', formController.submitForm);

// GET /api/forms
router.get('/', formController.getAllForms);

// GET /api/forms/:id
router.get('/:id', formController.getFormById);

// PUT /api/forms/:id
router.put('/:id', formController.updateForm);

// DELETE /api/forms/:id
router.delete('/:id', formController.deleteForm);

module.exports = router;
