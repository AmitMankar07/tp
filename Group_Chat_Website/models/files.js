const sequelize = require("../util/database");
const Sequelize = require("sequelize");


const File = sequelize.define('File', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false
    },
    data: {
      type: Sequelize.BLOB,
      allowNull: false
    }
  });
  
  module.exports = File;