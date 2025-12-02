// models/fileurl.js
const mongoose = require('mongoose');

const fileURLSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User ' // Reference to User
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('FileURL', fileURLSchema);