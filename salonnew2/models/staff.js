// staff.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');  // Correct import of the sequelize instance

const Staff = sequelize.define('Staff', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    specialization: {
        type: DataTypes.STRING, // Specializations like 'Haircut', 'Massage', etc.
        allowNull: false,
    },
    availability: {
        type: DataTypes.STRING, // Can store the availability schedule (e.g., '9am-5pm')
        allowNull: false,
    },
});

module.exports = Staff;  // Export the model
