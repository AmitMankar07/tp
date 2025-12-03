const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Service=require('./service');
const StaffService=require('./staffService')
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

// Define many-to-many relationship
// Staff.belongsToMany(Service, { through: 'StaffService', foreignKey: 'staffId' });

Staff.associate = (models) => {
    Staff.belongsToMany(models.Service, { through: StaffService, foreignKey: 'staffId' });
};
module.exports = Staff;
