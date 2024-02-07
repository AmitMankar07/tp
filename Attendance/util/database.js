const Sequelize=require('sequelize');

const sequelize = new Sequelize('Attendance', 'root', 'Amit1234', {
    host: 'localhost',
    dialect: 'mysql'
  });

  
  module.exports=sequelize;
