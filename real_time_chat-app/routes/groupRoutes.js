const express=require('express');

const router=express.Router();

const chatController = require("../controllers/chatController");
const groupController=require('../controllers/groupController');
const userAuthentication = require("../middleware/auth");


router.post("/createGroup", userAuthentication, groupController.createGroup);

// Route to fetch user's groups
router.get('/getUserGroups', userAuthentication, groupController.getUserGroups);

// Add user to group route
router.post('/addUserToGroup', userAuthentication, groupController.addUserToGroup);

// Remove user from group route
router.post('/removeUserFromGroup', userAuthentication, groupController.removeUserFromGroup);

// Make user admin route
router.post('/makeUserAdmin', userAuthentication, groupController.makeUserAdmin);

router.get('/:groupId/members', userAuthentication, groupController.getGroupMembers);

module.exports=router;