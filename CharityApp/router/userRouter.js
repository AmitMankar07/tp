const express = require("express");
const router = express.Router();

const userController = require("../controller/userController");
const profileController=require('../controller/profileController')
// const userAuthentication = require("../middleware/auth");
const authenticate = require("../middleware/auth");

// router.get("/", userController.getLoginPage);
// router.use(authenticate);
router.post("/user/signUp", userController.postSignUp);

router.post("/user/login", userController.postUserLogin);

router.put('/user/update-profile',authenticate, profileController.updateProfile);

router.get('/user/get-profile',authenticate,profileController.getProfile);

module.exports = router;