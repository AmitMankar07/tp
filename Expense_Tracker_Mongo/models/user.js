// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const ForgotPassword = require('./forgotPassword'); // Import the ForgotPassword model
const Expense = require('./expense'); // Import the Expense model

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isPremium:{
        type: Boolean,
        default: false
    },
    totalExpense: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true // Optional: adds createdAt and updatedAt fields
});

// Method to create a forgot password entry
userSchema.methods.createForgotPassword = async function({ isActive }) {
    try {
        const forgotPassword = await ForgotPassword.create({
            userId: this._id, // Use _id for Mongoose
            isActive: isActive
        });
        return forgotPassword;
    } catch (error) {
        throw new Error(error);
    }
};

// Define relationships
userSchema.virtual('expenses', {
    ref: 'Expense', // The model to use
    localField: '_id', // Find expenses where `localField`
    foreignField: 'userId' // is equal to `foreignField`
});

// Create the User model
const User = mongoose.model('User', userSchema);
module.exports = User;