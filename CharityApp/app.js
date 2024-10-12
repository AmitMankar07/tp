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

//Routes
const userRoutes=require('./router/userRouter');
const charityRoutes=require('./router/charityroutes');
const donationRoutes=require('./router/donationRoutes');
const adminRoutes=require('./router/admin')
//Models
const User=require('./models/userModel');
const charity=require('./models/charityModel');
const donation=require('./models/donationModel');
const project=require('./models/projectModel');
const report=require('./models/impactReport');
const notifications=require('./models/notification');

//Association
donation.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(donation, { foreignKey: 'userId' });
// User.hasMany(donation,{ foreignKey: 'userId', onDelete: 'CASCADE' });
// donation.belongsTo(User, { foreignKey: 'userId' });
charity.hasMany(project);
project.hasMany(donation);
project.hasMany(report);
User.hasMany(notifications);

//routes
app.use('/',userRoutes);
app.use('/',charityRoutes);
app.use('/',donationRoutes);
app.use('/',adminRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(process.env.PORT || 4000);
  })