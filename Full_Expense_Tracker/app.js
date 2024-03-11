
const express=require('express');
const app=express();
require('dotenv').config();

const path=require('path');
const cors=require('cors');

const sequelize=require('./util/db');
const User=require('./models/user');
const Expense=require('./models/expense')
const adminRoutes=require('./routes/adminRoutes');
const premiumRoutes=require('./routes/premium');
const Order=require('./models/orders');



app.use(express.static('./public'));
// console.log("in app.js")

app.use(cors());
app.use(express.json());
app.use('/users',adminRoutes);
app.use('/premium',premiumRoutes);

User.hasMany(Expense,{ foreignKey: 'userId' });
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);


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
