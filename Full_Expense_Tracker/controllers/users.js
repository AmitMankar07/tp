const User=require('../models/user');
const bcrypt=require('bcrypt');

const postSignUp=async(req,res,next)=>{
    try{
        const {name,email,password}=req.body;
       console.log("{name,email,password}:",{name,email,password});
       
       if (!name || !email || !password) {
           res.status(400).json({ message: 'Name, email, and password are required' });
           return;
         }
         // Check if the email id already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: 'Email id already exists' });
      return;
    }
         const hashedPassword=await bcrypt.hash(password,10);

       
         const user = await User.create({ name, email, password:hashedPassword});
         console.log("User created:", user);
         res.status(201).json(user);
      
     
   }catch(error){
       console.error(error);
       res.status(500).json({message:error.message});

   }
};

const postUserLogin=async(req,res,next)=>{
    try {
      console.log("inside login:",req.body)
        const { email, password } = req.body;
        console.log("email and pass",{ email, password });

        if (email==null || password==null) {
          res.status(400).json({ message: 'Email and password are required' });
          return;
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          res.status(401).json({ message: 'Invalid password' });
          return;
        }
        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
      }
};


module.exports={postSignUp,postUserLogin};