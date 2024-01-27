// controllers/contactController.js
const path=require('path');

exports.getContact=(req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'contactUs.html'));
}
;

