const Charity = require('../models/charityModel');
const { Op } = require("sequelize");
const bcrypt=require('bcrypt');
const server=require('http').createServer()


const io = require("socket.io")(5000, {
  cors: {
    origin: "http://localhost:4000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

exports.getCharities = async (req, res) => {
    const { search } = req.query;
    const charities = await Charity.findAll({
        // where: {
        //     name: {
        //         [Op.like]: `%${search}%`,
        //     },
        // },
    });
    console.log("charities:",charities);
    res.json(charities);
};

exports.searchCharities = async (req, res) => {
  console.log("search api triggered");
  const  searchTerm  = req.query.search;
  console.log("searchterm",searchTerm);
  const charities = await Charity.findAll({
    where: {
      [Op.or]: [
        { name: { [Op.iLike]: `%${searchTerm}%` } },
        { description: { [Op.iLike]: `%${searchTerm}%` } },
        { mission: { [Op.iLike]: `%${searchTerm}%` } }
      ]
    }
  },{ logging: console.log });
  console.log("search charities:", charities);
  if (charities.length === 0) {
    res.status(404).json({ message: "No charities found matching the search term" });
  } else {
    res.json(charities);
  }
};

exports.getCharity = async (req, res) => {
    const { id } = req.params;
    const charity = await Charity.findByPk(id);
    if (!charity) {
        return res.status(404).json({ error: 'Charity not found' });
    }
    res.json(charity);
};

exports.postCharityRegister = async (req, res) => {
  try {
    const charityData = {
      name: req.body.charityName,
      email: req.body.charityEmail,
      phoneNumber: req.body.charityMobileNum,
      // password: req.body.charityPassword,
      description: req.body.charityDescription,
      approved: false
    };
    const password = req.body.charityPassword;
    const hashedPassword = await bcrypt.hash(password, 10);
    charityData.password = hashedPassword;

    const charity = await Charity.create(charityData);
    
    console.log("chartiy regstr",charity);
    res.json({ success: true, message: "Charity registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error registering charity" });
  }
};

exports.postCharityLogin = async (req, res) => {
  try {
      const { charityEmail, charityPassword } = req.body;
      const charity = await Charity.findOne({ where: { email: charityEmail } });

      if (!charity) {
          return res.status(401).json({ success: false, error: 'Invalid email or password' });
      }

      const isValidPassword = await bcrypt.compare(charityPassword, charity.password);

      if (!isValidPassword) {
          return res.status(401).json({ success: false, error: 'Invalid email or password' });
      }

      res.json({ success: true, message: 'Login successful!' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Error logging in' });
  }
};

  exports.postCharityApprove = async (req, res) => {
    try {
      const { charityId } = req.body;
      const charity = await Charity.findOne({ where: { id: charityId } });
      if (!charity) {
        return res.status(404).json({ error: 'Charity not found' });
      }
      charity.status = 'approved';
      await charity.save();
      res.json({ charity });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

// app.post('/charity/approve', async (req, res) => {
//   const { charityId } = req.body;
//   const charity = await Charity.findOne({ where: { id: charityId } });
//   if (!charity) 
//     return res.status(404).json({ error: 'Charity not found' });
//   charity.status = 'approved';
//   await charity.save();
//   res.json({ charity });
// });