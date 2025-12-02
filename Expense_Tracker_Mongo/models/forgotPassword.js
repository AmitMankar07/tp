// models/forgotPassword.js
const mongoose = require('mongoose');

const forgotPasswordSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ' // Reference to User
    },
    isActive: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ForgotPassword', forgotPasswordSchema);