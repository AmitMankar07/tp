const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Review = sequelize.define('reviews', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // appointmentId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: Appointment,
    //     key: 'id'
    //   }
    // },
    // customerId: {
    //   type: Sequelize.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: User,
    //     key: 'id'
    //   }
    // },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    reviewText: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  module.exports=Review;