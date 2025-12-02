const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Payment = sequelize.define('payments', {
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
  paymentMethod: {
    type: Sequelize.STRING,
    allowNull: false
  },
  paymentStatus: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'pending'
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
});
module.exports = Payment;