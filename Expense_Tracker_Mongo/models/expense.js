// models/expense.js
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true  // Reference to User
    }
}, {
    timestamps: true
});
// expenseSchema.virtual('user', {
//     ref: 'User', // The model to use
//     localField: 'userId', // Find people where `localField`
//     foreignField: '_id', // is equal to `foreignField`
//     justOne: true // Only return one user
// });
module.exports = mongoose.model('Expense', expenseSchema);