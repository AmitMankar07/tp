const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define('User ', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.ENUM('customer', 'admin'),
        allowNull: false,
        defaultValue: 'customer',
    },
    preferences: {
        type: DataTypes.JSON,
        allowNull: true,
    },
});

module.exports = User;