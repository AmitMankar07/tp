const Service = require('../models/service');
const Appointment=require('../models/appointments')
const { sendBookingEmail } = require('../public/js/emailService'); // Adjust the path as necessary
const User=require('../models/user')
const Razorpay = require('razorpay');
const Order=require('../models/orders');

const profileController=require('./profileController')
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
// Create a new service
exports.createorder=async (req, res) => {
    console.log("in create rorer");

    const { amount, currency } = req.body; // Get amount and currency from the request

    const options = {
        amount: amount * 100, // Amount in paise
        currency: currency,
        receipt: `receipt_order_${Math.random() * 100000}`, // Unique receipt ID
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create order' });
    }
};

exports.getUserBookings = async (req, res) => {
    const userId = req.params.userId; // Assuming you have user authentication middleware that sets req.user
console.log("userid in get user",userId)
    try {
        const bookings = await Appointment.findAll({
            where: { user_id: userId },
            include: [{ model: Service }] // Include the Service model if you want service details
        });
        res.status(200).json(bookings);
    } catch (error) {
        console.error('Error fetching user bookings:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.createOrder = async (req, res) => {
    const { paymentId, orderId, status, amount, currency, serviceId, userId } = req.body;

    try {
        const order = await Order.create({
            paymentId,
            orderId,
            status,
            amount,
            currency,
            serviceId,
            userId
        });
        res.status(201).json({ message: 'Order created successfully!', order });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

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

// bookingController.js

profileController.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'User  not found' });
        }
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// async function bookAppointment(req, res) {
//     const { userId, serviceId, name, duration, price, description, paymentId } = req.body;

//     try {
//         // Logic to save the appointment in the database
//         const appointment = await Appointment.create({
//             userId,
//             serviceId,
//             name,
//             duration,
//             price,
//             description,
//             paymentId,
//         });

//         // Fetch user email (assuming you have a User model)
//         const user = await User.findByPk(userId);
//         if (user) {
//             await sendBookingEmail(user.email, {
//                 name,
//                 duration,
//                 price,
//                 description,
//             });
//         }

//         res.status(201).json({ message: 'Appointment booked successfully!', appointment });
//     } catch (error) {
//         console.error('Error booking appointment:', error);
//         res.status(500).json({ error: 'Failed to book appointment. Please try again later.' });
//     }
// }

// module.exports = { bookAppointment };
// Get all services
exports.bookappointment=async(req,res)=>{
    console.log("in book appointment")
    const { serviceId, name, duration, price, description,userId ,paymentId } = req.body; // Get service details from the request body
    console.log("Received data:", req.body);
    // console.log("service id",serviceId,req)
    console.log("Authenticated user:",userId);
    try {
        // if (!req.user || !req.user.id) {
        //     return res.status(401).json({ message: 'User  not authenticated' });
        // }
        // Logic to book the appointment (e.g., save to database)
        // const appointment = await Appointment.create({
        //     user_id: userId, // Use req.user.id to get the authenticated user's ID
        //     service_id: serviceId,
        //     description: description,
        //     duration: duration,
        //     price: price,
        //     appointment_date: new Date() 
        // });
        const appointment = await Appointment.create({
            user_id: userId,
            service_id: serviceId,
            appointment_date: new Date(), // Set the current date/time or any specific date
            user_name: name,
            // user_email: req.user.email, // Assuming you have the user's email in the request
            service_name: name, // You can also pass the service name directly
            // service_duration: duration,
            // service_price: price,
            payment_id: paymentId
        });
        const user = await User.findByPk(userId);
        if (user) {
            await sendBookingEmail(user.user_email, {
                name,
                duration,
                price,
                description,
            });
        }
        console.log('Appointment created:', appointment);
        res.status(201).json({ message: 'Appointment booked successfully!', appointment });
    } catch (error) {
        console.error('Error booking appointment:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    } 
}
exports.getUserAppointments=async (req, res) =>{
    const userId = req.params.userId; // Assuming you have user ID in the request

    try {
        const appointments = await Appointment.findAll({
            where: { user_id: userId },
            include: [{ model: User }, { model: Service }] // Include user and service details if needed
        });

        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for this user.' });
        }
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments. Please try again later.' });
    }
}

exports.getTotalServices = async (req, res) => {
    try {
        console.log("in get total service")
        const totalServices = await Service.count(); // Assuming you have a Service model
        res.status(200).json({ totalServices });
    } catch (error) {
        console.error('Error fetching total services:', error);
        res.status(500).json({ message: 'Error fetching total services', error });
    }
};
// bookingController.js
exports.cancelAppointment=async (req, res)=>{
    const { serviceId } = req.body;

    try {
        // Logic to cancel the appointment in the database
        const appointment = await Appointment.findOne({ where: { serviceId } });
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        await appointment.destroy(); // Delete the appointment
        res.json({ message: 'Appointment cancelled successfully!' });
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        res.status(500).json({ error: 'Failed to cancel appointment. Please try again later.' });
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
