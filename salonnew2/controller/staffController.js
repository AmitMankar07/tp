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
    // In staffController.js, add the getAssignments method
    exports.getAssignments = async (req, res) => {
        
        try {
            const staffData = await StaffService.findAll(); // Await the promise here
    console.log(staffData);
            const assignments = await StaffService.findAll({
                include: [
                    {
                        model: Staff,
                        required: true, // Ensures that only StaffService entries with Staff are returned
                    },
                    {
                        model: Service,
                        required: true, // Ensures that only StaffService entries with Service are returned
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
