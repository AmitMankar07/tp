const express = require('express');
const router = express.Router();
const authController = require('../controller/userController'); // Ensure the path is correct
const authMiddleware = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/profile', authMiddleware, authController.updateProfile);

module.exports = router;