const Sequelize=require('sequelize');
const sequelize=require('../util/db')
const bcrypt=require('bcrypt');
const expenses=require('./expense')

const User=sequelize.define('users',{
    id:{
        type : Sequelize.INTEGER,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    name:{
        type : Sequelize.STRING,
        allowNull : false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,

    },
    ispremiumuser:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }
});

User.hasMany(expenses,{foreignKey:'userId'});

module.exports=User;