const Razorpay=require('razorpay');
// const { req, res } = require('express');
const Order=require('../models/orders');

const purchasepremium = async (req, res) => {
    console.log("in purchase premium ");
    try {
      process.env.RAZORPAY_KEY_ID = 'rzp_test_2Jt7iv3nXqVdNE';
      process.env.RAZORPAY_KEY_SECRET = 'FRhmhKj3BNPSRtYOlDTDKUvl';
  
      const rzp = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
      console.log("values if configured");
      const amount = 100;
  
      const order = await rzp.orders.create({
        amount,
        currency: "INR",
        
      });
      console.log("order:",order);
  
    // Save the order details in the database
    await Order.create({
        orderid: order.id,
        amount: order.amount,
        currency: order.currency,
        status: "PENDING",
        userId:req.user.id,
      });
  
    //   const result = await rzp.orders.createOrder({ orderid: order.id, status: "PENDING" });
  
    
  
      return res.status(201).json({ order, key_id: rzp.key_id });
    } catch (err) {
      console.log(err);
      res.status(403).json({ message: "something went wrong" });
    }
  };


  const updateTransactionStatus = async (req, res) => {
    try {
      console.log("in updateTransactionStatus");
      const { payment_id, order_id,userid } = req.body;
  
      console.log("payment_id:", payment_id);
      console.log("order_id:", order_id);
      

      const [order, user] = await Promise.all([
        Order.findOne({ where: { orderid: order_id } }),
        req.user
      ]);
  
      console.log("order:", order);
      console.log("user:", user);
  
      if (!order || !user) {
        console.error("Order or user not found");
        return res.status(404).json({ success: false, message: "Order or user not found" });
      }
  
      await Promise.all([
        order.update({ paymentid: payment_id, status: 'SUCCESSFULL' ,userid: userid}),
        user.update({ ispremiumuser: true })
      ]);
  // Send the isPremiumUser property as part of the response
  // const updatedUser = await user.findOne({ where: { id: user.id } });
   
      console.log("Transaction updated successfully");
      return res.status(200).json({ success: true, message: "Transaction Successfull!"  });
    } catch (err) {
      console.error("Error in updateTransactionStatus:", err);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  };

module.exports={purchasepremium,updateTransactionStatus};

        