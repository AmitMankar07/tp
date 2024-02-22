
const express=require('express');
const app=express();

const path=require('path');
const cors=require('cors');

const sequelize=require('./util/db');
const User=require('./models/user');
const adminRoutes=require('./routes/adminRoutes');




app.use(express.static('./public'));
// console.log("in app.js")

app.use(cors());
app.use(express.json());
app.use('/users',adminRoutes);

sequelize.sync().then(
    ()=>{
        app.listen(3000,()=>{
            console.log('Server started on port 3000');
        })
    }
).catch(e=>console.log(e));



// sequelize
// .sync()
// // .sync({force : true})
// .then(()=>{

    
// }).catch(e => console.log(e))
