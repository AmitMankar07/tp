const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Staff = sequelize.define('staff', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  specialization: {
    type: Sequelize.STRING,
    allowNull: true
  },
  availability: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

  module.exports = Staff;