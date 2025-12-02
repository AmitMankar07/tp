const express = require("express");
const router = express.Router();

const { getStaffList,
    getStaffProfile,
    getServiceList,
    getStaffServiceList}=require('../controller');
router.get('/staff', getStaffList);
router.get('/staff/:id', getStaffProfile);

// Service Routes
router.get('/services', getServiceList);

router.get('/staff/:id/services', getStaffServiceList);


module.exports = router;