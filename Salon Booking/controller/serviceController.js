const Service = require('../models/serviceModel');

exports.addService = async (req, res) => {
    const { name, description, duration, price } = req.body;

    try {
        const service = await Service.create({ name, description, price });
        res.status(201).json({ message: 'Service added successfully', service });
    } catch (error) {
        res.status(500).json({ message: 'Error adding service', error });
    }
};