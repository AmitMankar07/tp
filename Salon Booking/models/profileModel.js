const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Profile = sequelize.define('profiles', {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  // userId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   references: {
  //     model: User,
  //     key: 'id'
  //   }
  // },
  personalInfo: {
    type: Sequelize.STRING,
    allowNull: true
  },
  preferences: {
    type: Sequelize.STRING,
    allowNull: true
  }
});
module.exports = Profile;