const express=require('express');
const app=express();

const bodyParser=require('body-parser');
const path=require('path');
const cors=require('cors');

const sequelize=require('./util/database');
const errorController=require('./controllers/error')
const adminRoutes=require('./routes/admin');

// middlleware
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



// routes
app.use('/students',adminRoutes);

// app.all('*',errorController);

sequelize.sync()
  .then(result => {
    console.log('Database and table created successfully.');
    app.listen(5000,()=>{
      console.log("Server is listening at port 5000...")
    });
  })
  .catch((error) => {
    console.error('Error creating database and table:', error);
  });

