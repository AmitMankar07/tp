const Charity = require('../models/charityModel');
const { Op } = require("sequelize");


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
      const { name, email, description } = req.body;
      const charity = await Charity.create({ name, email, description });
      res.json({ success: true, message: "Charity registered successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Error registering charity" });
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