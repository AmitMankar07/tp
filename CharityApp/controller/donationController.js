const Donation = require('../models/donationModel');
const Razorpay = require('razorpay');
// const axios = require('axios');

const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


exports.getDonationHistory = async (req, res) => {
  try {
    const donations = await Donation.findAll();
    res.json(donations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving donation history' });
  }
};

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

exports.getTotalDonations = async (req, res, next) => {
  try {
    const totalDonations = await Donation.sum('amount');
    console.log(totalDonations);
    res.status(200).json({
      message: 'Total donations fetched successfully',
      totalDonations: totalDonations
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching total donations',
      error: error
    });
  }
};

exports.donationHistory=async(req,res)=>{
    console.log("req.user indonte:",req.user.dataValues.id);
    try {
       
        const donations = await Donation.findAll({
          where: {
            userId: req.user.dataValues.id,
          }
        });
        console.log(donations);
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
  const { charityId, amount,userId } = req.body;
  console.log("req.user",req.user);
  console.log("req.body:",req.body);
  console.log("charityId, amount,userId ",charityId, amount,userId );
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
        paymentMethod:'Razorpay',
        status: 'pending',
        userId:userId,
        // userId:req.user.id,
      });
      console.log(donation);

      
    res.json({ orderId: order.id, razorpayKey: rzp.key_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating order' });
  }
};
exports.updateDonation = async (req, res) => {
  const { orderId, paymentId, signature, status } = req.body;
  console.log("orderId, paymentId, signature, status :",orderId, paymentId, signature, status )
  try {
    const donation = await Donation.findOne({ where:{orderId} });
    console.log("inupdt dontoion",donation);
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