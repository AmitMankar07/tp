const Staff = require('../models/staffModel');
const Service = require('../models/serviceModel');
const StaffService = require('../models/staffService');


// Staff Controllers
async function getStaffList(req, res) {
    try {
      const staffList = await Staff.find();
      res.json(staffList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting staff list' });
    }
  }




  
  
  async function getStaffProfile(req, res) {
    try {
      const staff = await Staff.findById(req.params.id);
      res.json(staff);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting staff profile' });
    }
  }
  
  // Service Controllers
  async function getServiceList(req, res) {
    try {
      const serviceList = await Service.find();
      res.json(serviceList);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting service list' });
    }
  }
  
  // Staff Service Controllers
  async function getStaffServiceList(req, res) {
    try {
      const staff = await Staff.findById(req.params.id);
      const staffServices = await StaffService.find({ staff: staff.id });
      res.json(staffServices);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error getting staff service list' });
    }
  }
  
  module.exports={getStaffServiceList,getServiceList,getStaffProfile,getStaffList};