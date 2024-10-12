const express = require('express');

const charityController=require('../controller/charityController');
const donationController=require('../controller/donationController');

const router = express.Router();

const authenticate = require("../middleware/auth");

// router.use(authenticate);
router.get('/charities', charityController.getCharities);
// router.get('/charities/search/:searchTerm', charityController.searchCharities);
router.get('/charities/search', charityController.searchCharities);

router.get('/charities/:id', charityController.getCharity);
router.post('/donate/:id', donationController.donate);
router.get('/donation-history',authenticate,donationController.donationHistory );
router.post('/update-donation',donationController.updateDonation);
router.post('/create-order', donationController.createOrder);
router.post('/verify-payment', donationController.verifyPayment);
router.get('/api/donationhistory', donationController.getDonationHistory);


module.exports=router;


