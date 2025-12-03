const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./utils/db');
const userRoutes = require('./routes/userRoutes'); // Ensure this is the correct path
const serviceRoutes = require('./routes/serviceRoutes');
const staffRoutes = require('./routes/staffRoutes'); 
require('dotenv').config();

const Staff = require('./models/staff');
const Service = require('./models/service');
const StaffService = require('./models/staffService');
const authentication=require("./middleware/auth")
const User=require('./models/user')
const Appointment=require('./models/appointments')
const Orders=require('./models/orders')
const models = {
    Staff,
    Service,
    StaffService,
};
Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});
User .hasMany(Appointment);
Appointment.belongsTo(User);


Service.hasMany(Appointment, { foreignKey: 'service_id' });
Appointment.belongsTo(Service, { foreignKey: 'service_id' });
// Define associations
Staff.belongsToMany(Service, { through: StaffService, foreignKey: 'staffId' });
Service.belongsToMany(Staff, { through: StaffService, foreignKey: 'serviceId' });
Orders.hasMany(User);


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
// Serve static files from the public directory
app.use(express.static('public')); // This line serves files from the public folder

// app.use(authentication);
// API routes
app.use('/api/auth', userRoutes); // This will handle routes like /api/auth/login
app.use('/api/services', serviceRoutes);
app.use('/api', staffRoutes);
const PORT = process.env.PORT || 5000;
async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // This will drop the existing table and create a new one
        await sequelize.sync({ force: true });
        console.log('Database & tables created!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// initializeDatabase();
sequelize.sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });
    