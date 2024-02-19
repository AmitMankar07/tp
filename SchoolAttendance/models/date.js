const Sequelize = require('sequelize')

const sequelize = require('../util/db')

const Date = sequelize.define('dates' , {
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    date : {
        type : Sequelize.DATEONLY,
        allowNull : false,
        unique : true
    }
})

module.exports = Date;