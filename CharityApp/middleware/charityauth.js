const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Charity=require('../models/charityModel');


const authenticateCharity = async (req, res, next) => {
  try {
      const token = req.header("Authorization").replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.TOKEN); // Use the same secret as for user tokens

      // Find the charity by ID or any other identifier you have
      const charity = await Charity.findOne({ where: { id: decoded.charityId } }); // Adjust based on your model

      if (!charity) {
          return res.status(401).json({ success: false, message: "Charity not found." });
      }

      req.charity = charity; // Set the charity object on the request
      next();
  } catch (err) {
      console.error(err);
      return res.status(401).json({ success: false, message: "Authentication failed." });
  }
};

module.exports =  authenticateCharity;