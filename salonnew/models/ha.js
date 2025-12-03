const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Staff=require('./staff');

const Service = sequelize.define('vice', {
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
Service.associate = (models) => {
    Service.belongsToMany(models.Staff, { through: models.StaffService, foreignKey: 'serviceId' });
};
// // Define many-to-many relationship
// Service.belongsToMany(Staff, { through: 'StaffService', foreignKey: 'serviceId' });

module.exports = Service;