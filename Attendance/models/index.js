const Sequelize = require('sequelize');
const sequelize = new Sequelize('Attendance', 'root', 'Amit1234', {
  host: 'localhost',
  dialect: 'mysql'
});

const Student = sequelize.define('Student', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }}, {
  tableName: 'students'
});

module.exports = {
  sequelize,
  Student
};