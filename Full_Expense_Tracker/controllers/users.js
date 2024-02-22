const User=require('../models/user');
const bcrypt=require('bcrypt');

const postSignUp=async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;
        const hashedPassword = await bcrypt.hash(password, 8);
        const user=await User.create({name,email,password:hashedPassword});
        res.status(201).json(user);
    }catch(error){
        res.status(500).json({message:error.message});

    }
}

module.exports={postSignUp};