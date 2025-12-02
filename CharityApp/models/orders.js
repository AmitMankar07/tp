const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const cation = sequelize.define('cations', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    subject: {
      type: Sequelize.STRING
    },
    message: {
      type: Sequelize.TEXT
    },
    // userId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: User,
    //     key: 'id'
    //   }
    // }
  });
  module.exports=cation;
