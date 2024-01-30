const { User } = require('../models/User');

exports.getForm = async (req, res) => {
  try {
    const users = await User.findAll();
    res.sendFile(__dirname + '/../views/form.html');
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Error fetching users');
  }
};

exports.submitForm = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newUser = await User.create({ name, email, phone });
    res.redirect('/');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByPk(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    await deletedUser.destroy();
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send('Error deleting user');
  }
};
