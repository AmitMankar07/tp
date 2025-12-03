const Staff = require('../models/staff');
const Service = require('../models/service');
const StaffService = require('../models/staffService');

// Create a new staff profile
// Create a new staff profile
exports.createStaff = async (req, res) => {
    try {
        const { name, specialization, availability } = req.body;
        
        // Validation for missing fields
        if (!name || !specialization || !availability) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const staff = await Staff.create({ name, specialization, availability });
        res.status(201).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Error creating staff profile', error });
    }
};


// Get all staff profiles
exports.getAllStaff = async (req, res) => {
    try {
        const staff = await Staff.findAll();
        res.status(200).json(staff);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching staff profiles', error });
    }
};
exports.getTotalAssignments = async (req, res) => {
    try {
        const totalAssignments = await StaffService.count(); // Assuming you have a StaffService model
        res.status(200).json({ totalAssignments });
    } catch (error) {
        console.error('Error fetching total assignments:', error);
        res.status(500).json({ message: 'Error fetching total assignments', error });
    }
};
// Assign services to a staff member
// Assign services to a staff member
// Assign services to a staff member
exports.assignServices = async (req, res) => {
    try {
        const { staffId, serviceIds } = req.body;
        
        // Validation for missing parameters
        if (!staffId || !serviceIds || serviceIds.length === 0) {
            return res.status(400).json({ message: 'Staff ID and service IDs are required' });
        }

        // Fetch the staff member from the database
        const staff = await Staff.findByPk(staffId);
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        // Fetch the services from the database based on the provided service IDs
        const services = await Service.findAll({ where: { id: serviceIds } });

        // Check if all services exist
        if (services.length !== serviceIds.length) {
            return res.status(400).json({ message: 'One or more services not found' });
        }

        // Check if the relationship exists and assign services
        await staff.setServices(services); // This assumes a many-to-many relationship and Sequelize model associations are set up properly
        res.status(200).json({ message: 'Services assigned successfully' });
    } catch (error) {
        console.error('Error assigning services:', error);
        res.status(500).json({ message: 'Error assigning services', error });
    }
};

exports.getTotalStaff = async (req, res) => {
    try {
        const totalStaff = await Staff.count(); // Assuming you have a Staff model
        res.status(200).json({ totalStaff });
    } catch (error) {
        console.error('Error fetching total staff:', error);
        res.status(500).json({ message: 'Error fetching total staff', error });
    }
};
// In staffController.js, add the getAssignments method
exports.getAssignments = async (req, res) => {
    try {
        console.log("in get assignments")
        const assignments = await StaffService.findAll({
            include: [
                {
                    model: Staff,
                    // required: true, // Ensures that only StaffService entries with Staff are returned
                },
                {
                    model: Service,
                    // required: true, // Ensures that only StaffService entries with Service are returned
                },
            ],
        });
        console.log("Assignment loaded",assignments);
        res.status(200).json(assignments);
    } catch (error) {
        console.error('Error loading assignments:', error);
        res.status(500).json({ message: 'Error loading assignments', error });
    }
};
// Update an existing staff profile
exports.updateStaff = async (req, res) => {
    try {
        const { id } = req.params; // Get staff ID from URL parameters
        const { name, specialization, availability } = req.body;

        // Validation for missing fields
        if (!name || !specialization || !availability) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Find the staff member by ID
        const staff = await Staff.findByPk(id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        // Update staff details
        await staff.update({ name, specialization, availability });
        res.status(200).json({ message: 'Staff updated successfully', staff });
    } catch (error) {
        console.error('Error updating staff:', error);
        res.status(500).json({ message: 'Error updating staff', error });
    }
};

// Delete a staff profile
exports.deleteStaff = async (req, res) => {
    try {
        const { id } = req.params; // Get staff ID from URL parameters

        // Find the staff member by ID
        const staff = await Staff.findByPk(id);
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' });
        }

        // Delete the staff member
        await staff.destroy();
        res.status(200).json({ message: 'Staff removed successfully' });
    } catch (error) {
        console.error('Error removing staff:', error);
        res.status(500).json({ message: 'Error removing staff', error });
    }
};