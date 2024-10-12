
const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Charity = sequelize.define('charities', {
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
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }, 
    phoneNumber: {
      type: Sequelize.INTEGER,
      allowNull: true
    }, 
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    // missionStatement: {
    //   type: Sequelize.TEXT
    // },
    // website: {
    //   type: Sequelize.STRING
    // },
    
    approved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  });

  module.exports=Charity;