const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const charitiesController = require('../controller/charityController');
const donationController=require('../controller/donationController');

// const recentActivityController = require('../controller/recentActivityController');
const User = require('../models/userModel');
const Charity = require('../models/charityModel');

// router.get('/admin', async (req, res) => {
//   const users = await User.findAll();
//   const charities = await Charity.findAll({ where: { status: 'approved' } });
//   res.render('admin', { users, charities });
// });

router.get('/api/users', userController.getAllUsers);
router.get('/api/charities', charitiesController.getCharities);
router.get('/api/donations/total',donationController.getTotalDonations);
// router.get('/api/recent-activity', recentActivityController.getRecentActivity);

module.exports = router;