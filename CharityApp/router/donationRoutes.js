const express = require('express');

const charityController=require('../controller/charityController');
const donationController=require('../controller/donationController');

const router = express.Router();

const authenticate = require("../middleware/auth");

// router.use(authenticate);
router.get('/charities', charityController.getCharities);
router.get('/charities/:id', charityController.getCharity);
router.post('/donate/:id', donationController.donate);
router.get('/donation-history',donationController.donationHistory );

router.post('/create-order', donationController.createOrder);
router.post('/verify-payment', donationController.verifyPayment);

module.exports=router;



// app.get('/charities', async (req, res) => {
//   const charities = await Charity.findAll({ where: { status: 'approved' } });
//   res.json({ charities });
// });

// app.post('/donate', async (req, res) => {
//   const { charityId, amount } = req.body;
//   const charity = await Charity.findOne({ where: { id: charityId } });
//   if (!charity) return res.status(404).json({ error: 'Charity not found' });
//   const donation = await Donation.create({ userId: req.user.id, charityId, amount });
//   const charge = await stripe.charges.create({
//     amount,
//     currency: 'usd',
//     source: req.body.stripeToken,
//     description: `Donation to ${charity.name}`
//   });
//   res.json({ donation, charge });
// });

// const express = require('express');
// const Donation = require('./models/Donation');

// // const app = express();

// app.get('/donations', async (req, res) => {
//   const donations = await Donation.findAll({ where: { userId: req.user.id } });
//   res.json({ donations });
// });

// app.get('/donation/receipt/:id', async (req, res) => {
//   const donation = await Donation.findOne({ where: { id: req.params.id } });
//  if (!donation) return res.status(404).json({ error: 'Donation not found' });
//   const receipt = `Donation Receipt\n\nDonation ID: ${donation.id}\nAmount: $${donation.amount}\nDate: ${donation.createdAt}\n`;
//   res.download(`receipt-${donation.id}.txt`, receipt);
// });