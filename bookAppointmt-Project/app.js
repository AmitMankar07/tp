const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./util/database');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML files from the 'views' folder
app.use(express.static('views'));

// Use user routes
app.use('/', userRoutes);

// Sync Sequelize models with the database
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });
``
