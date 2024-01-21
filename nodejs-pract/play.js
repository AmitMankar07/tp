
const http=require('http');
const bodyParser=require('body-parser');
const express=require('express');

const app=express();

app.use(bodyParser.urlencoded({extended: false}));

app.post('/add-product',(req,res,next)=>{
    // console.log("In the middleware");
    res.send('<form action="/product" method="POST">Name:<input type="text" name="title"> Size: <input type="number" name="size"><button type="submit">Add Product</button></form>')  
});
app.use('/product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
});

app.listen(4000);

// const server=http.createServer(app);

// server.listen(4000);

