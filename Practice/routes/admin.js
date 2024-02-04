const express=require('express');
const path=require('path');

const router=express.Router();
const rootDir=require('../util/path');

router.get('/',(req,res,next)=>{
    console.log("Reached the get route");
    res.sendFile(path.join(rootDir,'/views/form.html'));
});

router.post('/add-user',(req,res,next)=>{
    console.log("Reached the post route");
    const user=req.body;
    console.log('User obbject:',user);
    // res.json(user);
    res.status(201).json(user);
   
});

module.exports=router;