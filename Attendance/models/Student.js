const Sequelize= require('sequelize');
const sequelize = require('../util/database');

const Student = sequelize.define('students', {
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    allowNull:false,
    autoIncrement:true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,

  }
},{
  validate: {
    uniqueName() {
      return Student.findOne({ where: { name: this.name } })
        .then(student => {
          if (student) {
            throw new Error('Name must be different');
          }
        });
    }
  }
});

sequelize.sync().then(() => {
  console.log('students table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = Student;