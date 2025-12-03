// models/staffService.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db'); // Adjust path if necessary
const Staff=require('./staff');
const Service=require('./service');

const StaffService = sequelize.define('StaffService', {
    staffId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Staff,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Service,
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
});
StaffService.associate = () => {
    StaffService.belongsTo(Staff, { foreignKey: 'staffId' });
    StaffService.belongsTo(Service, { foreignKey: 'serviceId' });
};

module.exports = StaffService;
