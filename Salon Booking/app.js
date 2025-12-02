const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const CronJob=require('cron');

const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);

const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./util/database");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Router
const userRouter = require("./router/userRouter");
const homePageRouter = require("./router/homePageRouter");
// const chatRouter = require("./router/chatRouter");
// const groupRouter = require("./router/groupRouter");
const forgotPasswordRoutes=require('./router/forgotPassword');

//Models
const User = require("./models/userModel");
const Profile=require('./models/profileModel');
const Staff=require('./models/staffModel');
const Service=require('./models/serviceModel');
const StaffService=require('./models/staffService');
const Appointment=require('./models/appointmentModel');
const Review=require('./models/reviewModel');
const Payment=require('./models/paymentModel');

const Forgotpassword = require('./models/forgotPassword');


const serviceRoutes = require('./router/serviceRoutes');

User.hasOne(Profile);
Profile.belongsTo(User);

// Staff has many Services through StaffService
Staff.hasMany(StaffService);
Service.hasMany(StaffService);
StaffService.belongsTo(Staff);
StaffService.belongsTo(Service);

// Appointment belongs to one Customer, one Service, and one Staff
Appointment.belongsTo(User);
Appointment.belongsTo(Service);
Appointment.belongsTo(Staff);

// Review belongs to one Appointment and one Customer
Review.belongsTo(Appointment);
Review.belongsTo(User);

// Payment belongs to one Appointment
Payment.belongsTo(Appointment);

Forgotpassword.belongsTo(User, { foreignKey: 'userId' });


//Middleware
app.use("/", userRouter);
app.use("/user", userRouter);

app.use("/homePage", homePageRouter);

// app.use("/chat", chatRouter);

// app.use("/group", groupRouter);

app.use('/password',forgotPasswordRoutes);

// const job = require("./jobs/cron");
// job.start();

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 4000);
  })
//   .catch((err) => console.log(err));