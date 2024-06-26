const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
});

app.post('/donate', async (req, res) => {
  // ...
  const donation = await Donation.create({ userId: req.user.id, charityId, amount });
  const user = await User.findOne({ where: { id: req.user.id } });
  const charity = await Charity.findOne({ where: { id: charityId } });
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: user.email,
    subject: 'Donation Confirmation',
    text: `Thank you for your donation of $${donation.amount} to ${charity.name}!`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.error(error);
    else console.log(`Email sent: ${info.response}`);
  });
  // ...
});