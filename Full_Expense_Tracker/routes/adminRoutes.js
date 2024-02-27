const express=require('express');
const {postSignUp,postUserLogin}=require('../controllers/users')

const {postUserExpenses, getUserExpense,editUserExpenses,deleteUserExpenses,getAllExpenses}=require('../controllers/expenses');
const userAuthenticate=require('../middleware/auth')

const User=require('../models/user');
const bcrypt=require('bcrypt');
const router=express.Router();

router.post('/signup',postSignUp);

router.post('/login',postUserLogin);

router.post('/expenses',postUserExpenses);

router.get('/expenses',userAuthenticate.authenticate,getAllExpenses);

router.get('/expenses/:id',getUserExpense);

router.delete('/expenses/:id',deleteUserExpenses);

router.put('/expenses/:id',editUserExpenses);


module.exports=router;