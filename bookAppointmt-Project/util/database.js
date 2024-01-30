// util/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'Amit1234', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
});

module.exports = { sequelize };
