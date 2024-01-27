
const express = require('express');

const router = express.Router();

const successController=require('../controllers/successController');
router.get('/', successController.getSuccess);

module.exports = router;