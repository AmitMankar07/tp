const jwt = require('jsonwebtoken');

module.exports = (roles = []) => (req, res, next) => {
    console.log('Middleware reached');  // Log to see if middleware is hit
    console.log('Incoming headers:', req.headers);  // Log headers for debugging

    const authHeader = req.headers && req.headers['authorization']; // Ensure headers is defined
    if (!authHeader) {
        console.log('No token provided'); // Log for debugging
        return res.status(403).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        console.log('No token provided'); // Log for debugging
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Unauthorized:', err); // Log for debugging
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = decoded;
        next();
    });
};
