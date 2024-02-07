const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const cors=require('cors');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const adminRoutes=require('./routes/admin');
const { sequelize, Student } = require('./models/index');

app.use('/admin',adminRoutes);

app.all('*',(req,res,next)=>{
    res.status(404).send("Resource not found");
});

sequelize.sync()
  .then(() => {
    console.log('Database and table created successfully.');
  })
  .catch((error) => {
    console.error('Error creating database and table:', error);
  });

app.listen(5000,()=>{
    console.log("Server is listening at 6000...");
})