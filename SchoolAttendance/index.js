const express = require('express')
const cors = require('cors')

const app = express();
const path = require('path');
const bodyParser=require('body-parser');

app.use(express.static('./public'));

const sequelize = require('./util/db')

const Date = require('./models/date')
const Student = require('./models/student')
const Record = require('./models/record')

const studentRouter = require('./routes/admin')


app.use(cors())
app.use(express.json())
// app.get('/student', function(req, res) {
//     res.sendFile(path.join(__dirname, './frontend/index.html'));
//   });



// Student.create({name : "first"}).then(s => console.log(s)).catch(e => console.log(e))
// Student.create({name : "second"}).then(s => console.log(s)).catch(e => console.log(e))
// Student.create({name : "third"}).then(s => console.log(s)).catch(e => console.log(e))
// Student.create({name : "fourth"}).then(s => console.log(s)).catch(e => console.log(e))



Date.belongsToMany(Student ,{ through : Record})
Student.belongsToMany(Date ,{ through : Record})


app.use('/student' ,studentRouter )

sequelize
.sync()
// .sync({force : true})
.then(()=>{

    app.listen(4000)
}).catch(e => console.log(e))