const Sequelize= require('sequelize');
const sequelize = require('../util/database');

const Attendance = sequelize.define('attendance', {
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  status:{
    type:Sequelize.ENUM('present','absent'),
    allowNull:false
  }
},
   {
  tableName: 'attendance'
});

// sequelize.sync().then(() => {
//   console.log('attendance table created successfully!');
// }).catch((error) => {
//   console.error('Unable to create table : ', error);
// });
module.exports = {
  sequelize,
  Attendance
};