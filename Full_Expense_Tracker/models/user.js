const Sequelize=require('sequelize');
const sequelize=require('../util/db')
const bcrypt=require('bcrypt');

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
        allowNull:false,
        // set(value) {
        //     const hashedPassword = bcrypt.hashSync(value, 8);
        //     this.setDataValue('password', hashedPassword);
        //   }


    }
});

module.exports=User;