const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/admin', async (req, res) => {
  const users = await User.findAll();
  const charities = await Charity.findAll({ where: { status: 'approved' } });
  res.render('admin', { users, charities });
});