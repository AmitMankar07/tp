const express = require('express');
const router = express.Router();
const authController = require('../controller/userController'); // Ensure the path is correct
const authMiddleware = require('../middleware/auth');
const profileController=require('../controller/profileController')
router.post('/register', authController.register);
router.post('/login', authController.login);
router.put('/profile', authMiddleware, authController.updateProfile);

router.put('/user/update-profile', profileController.updateProfile);

router.get('/user/get-profile',profileController.getProfile);

module.exports = router;