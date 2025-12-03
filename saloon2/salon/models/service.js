// models/service.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Service = sequelize.define('Service', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER, // Duration in minutes
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
});

// Associations
Service.associate = function(models) {
    Service.belongsToMany(models.Staff, {
        through: models.StaffService,
        foreignKey: 'serviceId',
        otherKey: 'staffId',
    });
};

module.exports = Service;