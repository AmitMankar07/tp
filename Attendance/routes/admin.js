const express=require('express');
const path=require('path');

const router=express.Router();
const rootDir=require('../util/path');
const Student = require('../models/Student');

router.get('/', async (req, res) => {
    try {
      const students = await Student.findAll();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
    
  });
  router.get('/attendance', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/attendance.html'));
  });
  
// router.get('/',(req,res,next)=>{
//     console.log("Reached get ")
//     res.sendFile(path.join(rootDir,'/views/attendance.html'));
// });

router.post('/form',(req,res,next)=>{
    console.log("post req");
    res.json(req.body);
});


module.exports=router;