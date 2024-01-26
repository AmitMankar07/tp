const path=require('path');
const express=require('express');

const router=express.Router();
const rootDir=require('../util/path');

router.get('/',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'../','views','contactUs.html'));
})

module.exports=router;