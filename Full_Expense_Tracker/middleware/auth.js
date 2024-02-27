const jwt=require('jsonwebtoken');
const User=require('../models/user');

const authenticate=(req,res,next)=>{
    

    try {
        const token = req.header('Authorization');
console.log(token);
    // Check if token is missing
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }
        // Verify the token using the secret key
        const user= jwt.verify(token, 'secretkey');
        console.log('userID>>>>',user.userId);
        User.findByPk(user.userId).then(user=>{
            req.user=user;
            next();
        })

        // Attach the user ID to the request object
        

        // Continue to the next middleware

    } catch (error) {
        console.log("in auth");
        console.log("errror:",error)
        // If token is invalid, return an error response
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports=authenticate;