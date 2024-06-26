// controllers/profileController.js
const { Sequelize, sequelize } = require('../util/database');
const User = require('../models/userModel');
const jwt=require('jsonwebtoken');

const profileController = {};

profileController.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.name = name;
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
    console.log("req",req.user);
    const user = await User.findByPk(req.user.id);
    console.log("user:",user);
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