// Load environment variables from the .env file
require('dotenv').config();

const Sequelize = require('sequelize');

// Sequelize instance with environment variables
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.HOST_NAME,
  dialect: "mysql",
});

// Export the Sequelize instance
module.exports = sequelize;
