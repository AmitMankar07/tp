const Sequelize= require('sequelize');
const Student=require('../models/Student');
const sequelize = require('../util/database');



const Absence = sequelize.define('absences', {
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true
  },
  student_id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    references: {
      model: Student,
      key: 'id'
    }
  },
  date:{
    type:Sequelize.DATEONLY,
    allowNull:false
  },
  is_absent:{
    type:Sequelize.BOOLEAN,
    allowNull:false,
    defaultValue:true
  }
},{
  tableName:"absences",
});

Student.hasMany(Absence,{foreignKey:'student_id'});
Absence.belongsTo(Student,{foreignKey:'student_id'});


module.exports = {
  sequelize,
  Absence
};