
const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const ImpactReport = sequelize.define('impactReports', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    report: {
      type: Sequelize.TEXT
    },
    // projectId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Project,
    //     key: 'id'
    //   }
    // }
  });
  module.exports=ImpactReport;