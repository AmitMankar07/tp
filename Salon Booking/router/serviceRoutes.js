const express = require('express');
const router = express.Router();
const serviceController = require('../controller/serviceController');

router.post('/services', serviceController.addService);

module.exports = router;