const express = require('express');
const Charity = require('../models/charityModel');

const router = express.Router();

const charityController = require("../controller/charityController");
const charityAuthentication = require("../middleware/auth");

// router.get("/", charityController.getCharityRegisterPage);

router.post("/charity/register", charityController.postCharityRegister);
router.post("/charity/approve", charityController.postCharityApprove);

module.exports = router;
