const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/db');
const userRoutes = require('./routes/userRoutes'); // Ensure this is the correct path
const serviceRoutes = require('./routes/serviceRoutes');
const staffRoutes = require('./routes/staffRoutes'); 
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the public directory
app.use(express.static('public')); // This line serves files from the public folder

// API routes
app.use('/api/auth', userRoutes); // This will handle routes like /api/auth/login
app.use('/api/services', serviceRoutes);
app.use('/api', staffRoutes);
const PORT = process.env.PORT || 5000;

sequelize.sync({alter: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });