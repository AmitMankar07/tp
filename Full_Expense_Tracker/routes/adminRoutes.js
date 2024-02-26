const express=require('express');
const {postSignUp,postUserLogin}=require('../controllers/users')

const {postUserExpenses, getUserExpenses}=require('../controllers/expenses');

const User=require('../models/user');
const bcrypt=require('bcrypt');
const router=express.Router();

router.post('/signup',postSignUp);

router.post('/login',postUserLogin);

router.post('/expenses',postUserExpenses);

router.get('/expenses',getUserExpenses);

module.exports=router;