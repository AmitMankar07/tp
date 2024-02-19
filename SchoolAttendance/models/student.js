const Sequelize = require('sequelize')

const sequelize = require('../util/db')

const Student = sequelize.define('students' , {
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    totalPresent : {
        type : Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 0
    }
})

module.exports = Student;