// models/review.js
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db'); // Your Sequelize instance
const User = require('./user'); // Assuming you have a User model
const Service = require('./service'); // Assuming you have a Service model

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Service,
            key: 'id'
        }
    },
    review_text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'reviews',
    timestamps: false // Disable automatic timestamps if you are using created_at
});

// Export the model
module.exports = Review;