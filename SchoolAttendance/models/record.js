const Sequelize = require('sequelize')

const sequelize = require('../util/db')

const Record = sequelize.define('records' , {
    id : {
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    present : {
        type : Sequelize.BOOLEAN,
        allowNull : false,
        
    }
})

module.exports = Record;