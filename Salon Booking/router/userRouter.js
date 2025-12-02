const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const userAuthentication = require("../middleware/auth");
const {
    getUserProfile,
    updateUserProfile}=require('../controller/userController');
    
// router.get("/", userController.getLoginPage);

router.post("/signUp", userController.postSignUp);

router.post("/login", userController.postUserLogin);


router.get('/user/profile', getUserProfile);
router.put('/user/profile', updateUserProfile);

module.exports = router;