const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Display the form and entered data
router.get('/', userController.getForm);

// Submit the form
router.post('/submit', userController.submitForm);

// Delete a user
router.get('/delete/:id', userController.deleteUser);

module.exports = router;
