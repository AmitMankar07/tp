// db.js
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://rohit:RohitMankar@nodeexpress.xsbhykt.mongodb.net/ExpenseTracker");
        console.log('MongoDB connected...');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with a non-zero status code
    }
};

module.exports = connectDB;