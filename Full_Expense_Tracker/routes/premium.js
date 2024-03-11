const express = require('express');

const premiumController = require('../controllers/premium');
const router = express.Router();
const authenticate = require('../middleware/auth');

router.get('/showleaderboard', authenticate, premiumController.showLeaderBoard);


module.exports=router;