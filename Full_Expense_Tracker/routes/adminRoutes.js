const express=require('express');
const {postSignUp,postUserLogin}=require('../controllers/users')
const User=require('../models/user');
const bcrypt=require('bcrypt');
const router=express.Router();

router.post('/signup',postSignUp);

router.post('/login',postUserLogin);

module.exports=router;