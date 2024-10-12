
const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Donation = sequelize.define('donations', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    amount: {
      type: Sequelize.DECIMAL(10, 2)
    },
    paymentMethod: {
      type: Sequelize.STRING
    },
    paymentStatus: {
      type: Sequelize.STRING
    }, 
    orderId: {
      type: Sequelize.STRING
    },
    paymentId: {
      type: Sequelize.STRING
    },
    signature: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    // userId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: User,
    //     key: 'id'
    //   }
    // },
    // projectId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Project,
    //     key: 'id'
    //   }
    // }
  });
  module.exports=Donation;