const Sequelize = require('sequelize')

const sequelize = new Sequelize('attendnc' ,'root', 'Amit1234',{
    host :"localhost",
    dialect :"mysql"
})

module.exports = sequelize;