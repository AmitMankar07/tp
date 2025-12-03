const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const users=require('../models/user')
const service=require('../models/service')
const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: users, // Name of the target model
            key: 'id'
        }
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: service, // Name of the target model
            key: 'id'
        }
    },
    appointment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    tableName: 'appointments',
    timestamps: true // Enable automatic timestamps for createdAt and updatedAt
});

// Export the model
module.exports = Appointment;