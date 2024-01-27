const path=require('path');
const express=require('express');

const router=express.Router();
const rootDir=require('../util/path');

//get
router.get('/add-product',(req,res,next)=>{
    // console.log("In the middleware");
    res.sendFile(path.join(rootDir,'views','add-product.html'));
    });

    //POST
router.post('/add-product',(req,res,next)=>{
    console.log(req.body);
    res.redirect('/');
}); 

module.exports=router;