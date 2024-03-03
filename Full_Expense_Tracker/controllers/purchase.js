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
            const decodedToken = jwt.verify(token, 'secretkey');
        const userId = decodedToken.userId;

        // Fetch the user based on the userId from the decoded token
        const user = await User.findByPk(userId);
        req.user = user;

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        } if (user.ispremiumuser) {
          return res.status(400).json({ message: 'User is already a premium user.' });
      }
      const rzp = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });
     // Obtain token from request headers
    
      console.log("values if configured");
       const decoded = jwt.verify(token, 'secretkey');

      const amount = 100;
  
    //    rzp.orders.create({
    //     amount,
    //     currency: "INR",
    //   },{
    //     headers: {
    //       'Authorization': token
    //   },
    //   });
      
    //   console.log("order:",order);
  
    // // Save the order details in the database
    // await Order.create({
    //     orderid: order.id,
    //     amount: order.amount,
    //     currency: order.currency,
    //     status: "PENDING",
    //     userId:req.user.id,
    //   });
  
    // //   const result = await rzp.orders.createOrder({ orderid: order.id, status: "PENDING" });
  
    
  
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

          return res.status(201).json({ order, key_id: rzp.key_id });
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
      return res.status(200).json({ success: true, message: "Transaction Successfull!",token:userController.generateAccessToken(userid,undefined,true)  });
    } catch (err) {
      console.error("Error in updateTransactionStatus:", err);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  };

module.exports={purchasepremium,updateTransactionStatus};

        