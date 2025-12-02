
const express=require('express');
const app=express();
require('dotenv').config();

const mongoose = require('mongoose');
const path=require('path');
const cors=require('cors');
const fs=require('fs');
const session = require('express-session');
const connectDB=require('./util/db')

const sequelize=require('./util/db');
const User=require('./models/user');
const Expense=require('./models/expense')
const adminRoutes=require('./routes/adminRoutes');
const premiumRoutes=require('./routes/premium');
const Order=require('./models/orders');
const forgotPasswordRoutes=require('./routes/forgotPassword');
const FileURL=require('./models/fileurl');

const Forgotpassword = require('./models/forgotPassword');
const helmet=require('helmet');
const compression=require('compression');
// const morgan=require('morgan');

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('./public'));
// console.log("in app.js")


app.use(express.json());
app.use('/users',adminRoutes);
app.use('/premium',premiumRoutes);
app.use('/password',forgotPasswordRoutes);


app.use(helmet());
app.use(compression());


connectDB();
User();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
