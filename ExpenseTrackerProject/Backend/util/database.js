const Sequelize = require("sequelize");

const sequelize = new Sequelize("expense-tracker", "root", "Amit1234", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;