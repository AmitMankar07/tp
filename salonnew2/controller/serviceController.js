const Service = require('../models/service');
const Appointment=require('../models/appointments')
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
exports.bookappointment=async(req,res)=>{
    console.log("in book appointment")
    const { serviceId, name, duration, price, description } = req.body; // Get service details from the request body
    console.log("Received data:", req.body);
    // console.log("service id",serviceId,req)
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'User  not authenticated' });
        }
        // Logic to book the appointment (e.g., save to database)
        const appointment = await Appointment.create({
            user_id: req.user.id, // Use req.user.id to get the authenticated user's ID
            service_id: serviceId,
            description: description,
            duration: duration,
            price: price,
            appointment_date: new Date() 
        });
        console.log('Appointment created:', appointment);
        res.status(201).json({ message: 'Appointment booked successfully!', appointment });
    } catch (error) {
        console.error('Error booking appointment:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    } 
}
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
