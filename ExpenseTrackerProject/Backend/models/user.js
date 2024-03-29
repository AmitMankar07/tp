const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    number: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isPremium: Sequelize.BOOLEAN,
    totalExpenses: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
});

module.exports = User;