const Charity=require('../models/charityModel');

exports.updateCharity=async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phoneNumber, description } = req.body;
        const charity = await Charity.findByPk(id);
        if (!charity) {
            return res.status(404).json({ error: 'Charity not found' });
        }
        await charity.update({ name, email, phoneNumber, description });
        res.json(charity);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};