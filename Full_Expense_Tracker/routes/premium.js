const express = require('express');

const premiumController = require('../controllers/premium');
const router = express.Router();
const authenticate = require('../middleware/auth');

router.get('/showleaderboard', authenticate, premiumController.showLeaderBoard);

// router.get('/download', authenticate, premiumController.downloadExpenses);


module.exports=router;