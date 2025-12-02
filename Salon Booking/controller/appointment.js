
const Appointment = require('../models/appointmentModel');
// Appointment Controllers
async function bookAppointment(req, res) {
    try {
      const appointment = new Appointment(req.body);
      await appointment.save();
      res.json(appointment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error booking appointment' });
    }
  }
  
  async function getAppointmentList(req, res) {
    try {
      const appointmentList = await Appointment.find();
      res.json(appointmentList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting appointment list' });
    }
  }
  
  module.exports={getAppointmentList,bookAppointment};