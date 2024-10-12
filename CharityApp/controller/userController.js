const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');

const postSignUp = async (req, res, next) => {
  try {
    const { name, email, password, mobileno } = req.body;
    console.log("{name,email,password}:", { name, email, password, mobileno });

    if (!name || !email || !password || !mobileno) {
      res.status(400).json({ message: 'Name, email, and password are required' });
      return;
    }
    
    // Check if the email id already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email id already exists' });
      return;
    }
    const userCount = await User.count();
    let role = 'user';
    if (userCount === 0) {
      role = 'admin';
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const user = await User.create({ name, email, password: hashedPassword, mobileno ,role});
    console.log("User created:", user);
    // res.status(201).json(user);

    const accessToken = generateAccessToken(user.id, user.name, user.role === 'admin');
    res.status(201).json({ user, accessToken });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });

  }
};
const generateAccessToken = (id, name, ispremiumuser,role) => {
  return jwt.sign({ userId: id, name: name, ispremiumuser ,role}, 'secretkey');
}

const postUserLogin = async (req, res, next) => {
  try {
    console.log("inside login:", req.body)
    const { email, password } = req.body;
    console.log("email and pass", { email, password });

    if (email == null || password == null) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }

    // console.log("user.ispremiumuser",user.ispremiumuser)
    // const token=jwt.sign({userId:user.id,name:user.name,ispremiumuser:user.ispremiumuser},'secretkey');
    // console.log("token login:",token);

    const token = generateAccessToken(user.id, user.name, user.ispremiumuser,user.role);

    res.status(200).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    const totalCount = users.length;
    res.status(200).json({
      message: 'All users fetched successfully',
      users: users,
      totalCount: totalCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error fetching users',
      error: error
    });
  }
};



module.exports = { postSignUp, postUserLogin, generateAccessToken ,getAllUsers};
