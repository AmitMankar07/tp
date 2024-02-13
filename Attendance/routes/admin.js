const express=require('express');
const path=require('path');
const {getAllStudents}=require('../controllers/students')
const router=express.Router();

router.route('/').get(getAllStudents);



module.exports=router;