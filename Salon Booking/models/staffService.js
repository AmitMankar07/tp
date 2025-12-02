const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const StaffService = sequelize.define('staff_services', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // staffId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Staff,
    //     key: 'id'
    //   }
    // },
    // serviceId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Service,
    //     key: 'id'
    //   }
    // }
  });

  module.exports=StaffService;