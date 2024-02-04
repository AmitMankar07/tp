
// //Module
// const express=require('express');
// const path=require('path');

// const bodyParser=require('body-parser');

// const app=express();

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(express.static(path.join(__dirname,'public')));

// const adminRoutes=require('./routes/admin');

// app.use('/form',adminRoutes);

// // const names=require('./4-names');
// // const sayHi=require('./5-utils');

// // sayHi('rip')
// // sayHi(names.amit)
// // sayHi(names.hasm)

// // require('./7-fuctionInvoke')
// console.log('hello');
// app.listen(3000);
// // console.log(module)

const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const cors=require('cors');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());



const adminRoutes=require('./routes/admin');

app.use('/',adminRoutes);

app.use(express.static('./public'));

app.all('*',(req,res,next)=>{
    res.status(404).send("Resource not found");
});

app.listen(5000,()=>{
    console.log("Server is running..");
});