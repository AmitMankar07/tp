const Razorpay=require('razorpay');
// const { req, res } = require('express');
const Order=require('../models/orders');
const jwt=require('jsonwebtoken');
const User=require('../models/user');
const userController=require('../controllers/users');

const purchasepremium = async (req, res) => {
    console.log("in purchase premium ");
    const token=req.header('Authorization');
          console.log("token in purschase premium:",token);
      // Check if the token is present
      if (!token) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }

          try {
      const rzp = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
     // Obtain token from request headers
    
      console.log("values if configured");
      
      const amount = 4000;
  
  
    //   return res.status(201).json({ order, key_id: rzp.key_id });
    rzp.orders.create({ // Ensure correct function call
      amount,
      currency: "INR",
  }, async (error, order) => {
      if (error) {
          console.error(error);
          return res.status(500).json({ message: "error creating order" });
      }
      console.log("order:", order);

      try {
          await Order.create({
              orderid: order.id,
              amount: order.amount,
              currency: order.currency,
              status: "PENDING",
              userId: req.user.id,
          });
            // Generate a new token reflecting the user's premium status
            // const updatedUser = await User.findOne({ where: { id: req.user.id } });
            // const newToken = await userController.generateAccessToken(updatedUser.id, updatedUser.name, updatedUser.ispremiumuser);
            // Update the user's ispremiumuser field
               const updatedUser = await User.updateOne(
      { _id: req.user.id},
      { $set: { isPremium: true } } 
    );
    console.log("updated User:",updatedUser)
    

                // Fetch the updated user to confirm the change
                const user = await User.findById(req.user.id);
                console.log("Fetched updated user:", user);
            const newToken = jwt.sign(
              {
                userId: req.user.id,
                name: req.user.name,
                ispremiumuser: true,
                iat: Math.floor(Date.now() / 1000),
              },
              process.env.TOKEN_SECRET
            );
console.log("newtoken in purchasepremium:",newToken)
          return res.status(201).json({ order, key_id: rzp.key_id , token: newToken});
      } catch (err) {
          console.log(err);
          return res.status(500).json({ message: "error saving order details" });
      }
  });
  
  } catch (err) {
      console.log(err);
      res.status(403).json({ message: "error proccesing purchase",err });
    }
  };


  const updateTransactionStatus = async (req, res) => {
    try {
      console.log("in updateTransactionStatus");
      const { payment_id, order_id,userid } = req.body;
  
      console.log("payment_id:", payment_id);
      console.log("order_id:", order_id);
      console.log("Received userid:", userid);

        // Fetch the user based on the received userid
        const user = await User.findById(userid);
        console.log("Fetched user:", user);
    
      const order = await Order.findOne({ orderid: order_id });
      console.log("Fetched order:", order);

    
      if (!order || !user) {
        if (!order) {
            console.error("No order found with order_id:", order_id);
        }
        if (!user) {
            console.error("No user found with userid:", userid);
        }
        return res.status(404).json({ success: false, message: "Order or user not found" });
    }
      // await Promise.all([
      //   order.update({ paymentid: payment_id, status: 'SUCCESSFULL' ,userid: userid}),
      //   user.update({ ispremiumuser: true })
      // ]);
      order.paymentid = payment_id;
    order.status = 'SUCCESSFULL';
    order.id = userid;
    await order.save(); // Save the updated order

    user.isPremium = true;
    await user.save();
  // Send the isPremiumUser property as part of the response
  // const updatedUser = await user.findOne({ where: { id: user.id } });
  // ,token:userController.generateAccessToken(userid,undefined,true) 
  const updatedToken=jwt.sign({
    userId: user.id,
            name: user.name,
            ispremiumuser: user.isPremium,
            iat: Math.floor(Date.now() / 1000),
  },process.env.TOKEN_SECRET);
  req.user.token=updatedToken;
  // const updatedUser = await User.findOne({ where: { id: user.id } });
  // const newToken = userController.generateAccessToken(updatedUser.id, updatedUser.name, updatedUser.ispremiumuser);
  // const newToken = userController.generateAccessToken(user.id, user.name, user.ispremiumuser);
  // localStorage.setItem('token', updatedToken);
  console.log("newtoken in update transaction",updatedToken);
      return res.status(200).json({ success: true, message: "Transaction Successfull!",token:updatedToken});
      console.log("Transaction updated successfully");
    } catch (err) {
      console.error("Error in updateTransactionStatus:", err);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  };

module.exports={purchasepremium,updateTransactionStatus};

        