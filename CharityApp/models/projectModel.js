const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Project = sequelize.define('projects', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT
    },
    goalAmount: {
      type: Sequelize.DECIMAL(10, 2)
    },
    // charityId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Charity,
    //     key: 'id'
    //   }
    // }
  });
  module.exports=Project;
