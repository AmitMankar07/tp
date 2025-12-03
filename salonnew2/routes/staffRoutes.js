const express = require('express');
const router = express.Router();
const staffController = require('../controller/staffController');

// Create a new staff profile
router.post('/staff', staffController.createStaff);

// Get all staff profiles
router.get('/staff', staffController.getAllStaff);

// Assign services to staff member
// Change this line
router.post('/assignments', staffController.assignServices);

// In staffRoutes.js, add the GET route for assignments
router.get('/assignments', staffController.getAssignments);

module.exports = router;
