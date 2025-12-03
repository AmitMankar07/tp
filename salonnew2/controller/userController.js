const User = require('../models/user'); // Ensure this is the correct path
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Registration
exports.register = async (req, res) => {
    console.log('Registration request:', req.body); // Log the incoming request

    const { username, password, email, role } = req.body;

    if (!username || !password || !email || !role) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existingUser  = await User.findOne({ where: { username } });
        if (existingUser ) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, email, role });
        res.status(201).json({ message: 'User  registered successfully', user });
    } catch (error) {
        console.error('Registration error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error' });
    }
};

// User Login
exports.login = async (req, res) => {
    const { username, password, role } = req.body;

    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ message: 'User  not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Check if the role matches
        if (user.role !== role) {
            return res.status(403).json({ message: 'Role does not match' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        console.error('Login error:', error); // Log the error for debugging
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
    const { id } = req.user; // Get user ID from the token
    const { username, email } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: 'User  not found' });

        user.username = username || user.username;
        user.email = email || user.email;
        await user.save();

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};