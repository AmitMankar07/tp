// const { DataTypes } = require('sequelize');
// const sequelize = require('../utils/db');
// const users=require('../models/user')
// const service=require('../models/service')
// const Appointment = sequelize.define('Appointment', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     user_id: {
//         type: DataTypes.INTEGER,
//         // allowNull: false,
//         references: {
//             model: users, // Name of the target model
//             key: 'id'
//         }
//     },
//     service_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: service, // Name of the target model
//             key: 'id'
//         }
//     },
//     appointment_date: {
//         type: DataTypes.DATE,
//         allowNull: false
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     },
//     updatedAt: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//         onUpdate: DataTypes.NOW
//     }
// }, {
//     tableName: 'appointments',
//     timestamps: true // Enable automatic timestamps for createdAt and updatedAt
// });

// // Export the model
// module.exports = Appointment;

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');
const users = require('../models/user');
const service = require('../models/service');

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: users, // Name of the target model
            key: 'id'
        }
    },
    service_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: service, // Name of the target model
            key: 'id'
        }
    },
    appointment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_name: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    // user_email: {
    //     type: DataTypes.STRING,
    //     // allowNull: false
    // },
    service_name: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    // service_duration: {
    //     type: DataTypes.STRING,
    //     // allowNull: false
    // },
    // service_price: {
    //     type: DataTypes.FLOAT,
    //     // allowNull: false
    // },
    payment_id: {
        type: DataTypes.STRING,
        // allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    }
}, {
    tableName: 'appointments',
    timestamps: true // Enable automatic timestamps for createdAt and updatedAt
});

// Export the model
module.exports = Appointment;