// controllers/profileController.js
const { Sequelize, sequelize } = require('../utils/db');
const User = require('../models/user');
const jwt=require('jsonwebtoken');

const profileController = {};

profileController.updateProfile = async (req, res) => {
  try {
    console.log("in update")
    const { name, email } = req.body;
    console.log("df",name,email);
    const userId = req.query.userId; // Get userId from query parameters
        const user = await User.findByPk(userId);

    // const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.username = name;
    user.email = email;
    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

profileController.getProfile = async (req, res) => {
  try {
    // console.log("req",req);
    // const user = await User.findByPk(req.user.id);
    // console.log("user:",user);
    const userId = req.query.userId; // Get userId from query parameters
        const user = await User.findByPk(userId); // Use userId to find the user
        console.log("user:", user);
        
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = profileController;