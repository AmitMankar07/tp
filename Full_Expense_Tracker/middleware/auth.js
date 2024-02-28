const jwt=require('jsonwebtoken');
const User=require('../models/user');

const authenticate=async(req,res,next)=>{
    

    try {
        const token = req.header('Authorization');
console.log(token);
    // Check if token is missing
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Token missing.' });
    }
        // Verify the token using the secret key
        const decodedToken = jwt.verify(token, 'secretkey');
        const userId = decodedToken.userId;

        console.log('userID>>>>',userId);
          // Check if user exists
          const user = await User.findByPk(userId);
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
         // Attach the user object to the request
         req.user = user;

         // Continue to the next middleware
         next();

        

        

    } catch (error) {
        console.log("in auth");
        console.log("errror:",error)
        // If token is invalid, return an error response
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

module.exports=authenticate;