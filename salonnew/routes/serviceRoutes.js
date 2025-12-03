const express = require('express');
const router = express.Router();
const serviceController = require('../controller/serviceController');
const authentication=require("../middleware/auth")

// Get all services
router.get('/', serviceController.getAllServices);


router.post('/book-appointment', serviceController.bookappointment);

router.post('/payment/create-order', serviceController.createorder);
// Create a new service
router.post('/', serviceController.createService);

router.get('/user-bookings/:userId', serviceController.getUserBookings);
// Get service by ID
router.get('/:id', serviceController.getServiceById);

router.post('/create-order', serviceController.createOrder);

router.get('/getUser/:userId', serviceController.getUserAppointments);
// routes.js
router.post('/cancel-appointment', serviceController.cancelAppointment);
// Update a service
router.put('/:id', serviceController.updateService);

// Delete a service
router.delete('/:id', serviceController.deleteService);

// Get total number of services
router.get('/total-services', serviceController.getTotalServices);
module.exports = router;
