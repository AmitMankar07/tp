const Service = require('../models/service');

// Create a new service
exports.createService = async (req, res) => {
    const { name, description, duration, price } = req.body;

    try {
        const service = await Service.create({ name, description, duration, price });
        res.status(201).json(service);
    } catch (error) {
        console.error('Error creating service:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all services
exports.getAllServices = async (req, res) => {
    try {
        const services = await Service.findAll();
        res.status(200).json(services);
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getServiceById = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await Service.findByPk(id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.status(200).json(service);
    } catch (error) {
        console.error('Error fetching service by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a service
exports.updateService = async (req, res) => {
    const { id } = req.params;
    const { name, description, duration, price, available } = req.body;

    try {
        const service = await Service.findByPk(id);
        if (!service) return res.status(404).json({ message: 'Service not found' });

        service.name = name || service.name;
        service.description = description || service.description;
        service.duration = duration || service.duration;
        service.price = price || service.price;
        service.available = available !== undefined ? available : service.available;

        await service.save();
        res.status(200).json(service);
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a service
exports.deleteService = async (req, res) => {
    const { id } = req.params;

    try {
        const service = await Service.findByPk(id);
        if (!service) return res.status(404).json({ message: 'Service not found' });

        await service.destroy();
        res.status(204).send();
    } catch (error) {
        console.error('Error deleting service:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
// Update a service
exports.updateService = async (req, res) => {
    const { id } = req.params;
    const { name, description, duration, price, available } = req.body;

    try {
        const service = await Service.findByPk(id);
        if (!service) return res.status(404).json({ message: 'Service not found' });

        service.name = name || service.name;
        service.description = description || service.description;
        service.duration = duration || service.duration;
        service.price = price || service.price;
        service.available = available !== undefined ? available : service.available; // Update availability

        await service.save();
        res.status(200).json(service);
    } catch (error) {
        console.error('Error updating service:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
