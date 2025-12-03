const express = require('express');
const router = express.Router();
const staffController = require('../controller/staffController');
const  submitController = require('../controller/reviewController');
// Create a new staff profile
router.post('/staff', staffController.createStaff);

// Get all staff profiles
router.get('/staff', staffController.getAllStaff);

// Assign services to staff member
// Change this line
router.post('/assignments', staffController.assignServices);

// In staffRoutes.js, add the GET route for assignments
router.get('/assignments', staffController.getAssignments);

router.post('/submit-review', submitController.submitReview);

// Get total number of reviews
router.get('/total-reviews', submitController.getTotalReviews);

// Define the route for fetching reviews
router.get('/reviews/:serviceId', submitController.getReviews);

// Get total number of staff
router.get('/total-staff', staffController.getTotalStaff);

// Get total number of services
// router.get('/total-services', serviceController.getTotalServices);

// Get total number of assignments
router.get('/total-assignments', staffController.getTotalAssignments);

// Update a staff profile
router.put('/staff/:id', staffController.updateStaff);

// Delete a staff profile
router.delete('/staff/:id', staffController.deleteStaff);
module.exports = router;
