// models/staff.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Staff = sequelize.define('Staff', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    specialization: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    availability: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Associations
Staff.associate = function(models) {
    Staff.belongsToMany(models.Service, {
        through: models.StaffService,
        foreignKey: 'staffId',
        otherKey: 'serviceId',
    });
};

module.exports = Staff;