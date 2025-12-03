// const Sequelize=require('sequelize');
// const { DataTypes } = require('sequelize');

// // const sequelize=require('../util/db');
// const sequelize=require('../utils/db')
// const Order=sequelize.define('Order',{
//     id:{
//         type :DataTypes.INTEGER,
//         allowNull : false,
//         primaryKey : true,
//         autoIncrement : true
//     },
//     paymentid:DataTypes.STRING,
//     orderid:DataTypes.STRING,
//     status:DataTypes.STRING
// });

// module.exports=Order;
const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    paymentId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    orderId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false
    },
    serviceId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

module.exports = Order;