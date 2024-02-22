const Sequelize=require('sequelize');

const sequelize=new Sequelize('expensetracker','root','Amit1234',{
host:"localhost",
dialect:"mysql"
})

module.exports=sequelize;