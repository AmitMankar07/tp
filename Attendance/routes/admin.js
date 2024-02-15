const express=require('express');
const path=require('path');
const {getAllStudents,postAbsentStudents,getAbsentStudent}=require('../controllers/students')
const router=express.Router();

router.route('/').get(getAllStudents);

router.route('/attendance').post(postAbsentStudents);

router.route('/attendance/:date').get(getAbsentStudent);

module.exports=router;