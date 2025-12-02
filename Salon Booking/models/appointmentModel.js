const sequelize = require("../util/database");
const Sequelize = require("sequelize");

const Appointment = sequelize.define('appointments', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  // customerId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: User,
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
  // },
  // staffId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: Staff,
  //     key: 'id'
  //   }
  // },
  appointmentDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  appointmentTime: {
    type: Sequelize.TIME,
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'pending'
  }
});

module.exports = Appointment;