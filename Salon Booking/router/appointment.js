const express = require("express");
const router = express.Router();

const {  bookAppointment,
    getAppointmentList}=require('../controller/')

    
// Appointment Routes
router.post('/appointments', bookAppointment);
router.get('/appointments', getAppointmentList);


module.exports=router;