const path=require('path');
// const http=require('http');
const express=require('express');
const bodyParser=require('body-parser');



const app=express();

const adminRoutes=require('./routes/admin');
const shopRoutes=require('./routes/shop');
const contactRoutes=require('./routes/contactus');

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use('/contactus',contactRoutes);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(__dirname,'views','404Error.html'));
});
app.listen(4000);

// const server=http.createServer(app);

// server.listen(4000);

