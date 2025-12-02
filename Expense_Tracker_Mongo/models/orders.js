// models/orders.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    paymentid: {
        type: String,
        required: false, 
    },
    orderid: {
        type: String,
        required: true, 
        unique: true,   
    },
    status: {
        type: String,
        required: true, 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' // Reference to User
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);