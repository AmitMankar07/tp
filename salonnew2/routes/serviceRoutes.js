const express = require('express');
const router = express.Router();
const serviceController = require('../controller/serviceController');
const authentication=require("../middleware/auth")
// Get all services
router.get('/', serviceController.getAllServices);


router.post('/book-appointment', serviceController.bookappointment);

// Create a new service
router.post('/', serviceController.createService);

// Get service by ID
router.get('/:id', serviceController.getServiceById);

// Update a service
router.put('/:id', serviceController.updateService);

// Delete a service
router.delete('/:id', serviceController.deleteService);

module.exports = router;
