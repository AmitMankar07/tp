// models/staffService.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const Staff = require('./staff');
const Service = require('./service');

const StaffService = sequelize.define('StaffService', {
    staffId: {
        type: DataTypes.INTEGER,
        references: {
            model: Staff,
            key: 'id',
        },
    },
    serviceId: {
        type: DataTypes.INTEGER,
        references: {
            model: Service,
            key: 'id',
        },
    },
});

// Define associations
Staff.belongsToMany(Service, { through: StaffService, foreignKey: 'staffId' });
Service.belongsToMany(Staff, { through: StaffService, foreignKey: 'serviceId' });

module.exports = StaffService;