const Donation = require('../models/donationModel');
const Razorpay = require('razorpay');
const axios = require('axios');

const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.donate = async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
const charity = await Charity.findByPk(id);
    if (!charity) {
        return res.status(404).json({ error: 'Charity not found' });
    }
    const donation = await Donation.create({ charityId: id, amount });
    const payment = await razorpay.orders.create({
        amount,
        currency: 'INR',
        receipt: `donation-${donation.id}`,
    });
    res.json({ payment });
};

exports.donationHistory=async(req,res)=>{
    console.log("req.user indonte:",req.user.dataValues.id);
    try {
       
        const donations = await Donation.findAll({
          where: {
            userId: req.user.dataValues.id,
          }
        });
        res.json(donations);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
exports.createOrder = async (req, res) => {
  if (!req.body.charityId ||!req.body.amount) {
    return res.status(400).json({ error: 'charityId and amount are required' });
  }
  const { charityId, amount } = req.body;
  console.log("req.user",req.user);
  console.log("charityId, amount ",charityId, amount );
  try {
    const order = await rzp.orders.create({
      amount: amount * 100, // Convert to paise
      currency: 'INR',
      receipt: `Donation to charity ${charityId}`,
    });
      // Create a new donation entry in the database
      const donation = await Donation.create({
        charityId,
        amount,
        orderId: order.id,
        razorpayKey: rzp.key_id,
        status: 'pending',
        // userId:req.user.id,
      });

    res.json({ orderId: order.id, razorpayKey: rzp.key_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};
exports.updateDonation = async (req, res) => {
  const { orderId, paymentId, signature, status } = req.body;
  try {
    const donation = await Donation.findOne({ orderId });
    if (donation) {
      donation.paymentId = paymentId;
      donation.signature = signature;
      donation.status = status;
      await donation.save();
      res.json({ message: 'Donation updated successfully' });
    } else {
      res.status(404).json({ message: 'Donation not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating donation' });
  }
};
exports.verifyPayment = async (req, res) => {
  const { paymentId, signature } = req.body;
  try {
    // Verify payment with Razorpay API
    const paymentResponse = await axios.post('https://api.razorpay.com/v1/payments/' + paymentId + '/verify', {
      signature,
    });
    res.json(paymentResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error verifying payment' });
  }
};