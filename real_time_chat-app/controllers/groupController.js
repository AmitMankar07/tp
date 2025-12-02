const path = require("path");
const User = require("../models/user");
const Group = require("../models/group");
const UserGroup = require("../models/userGroup");
const { Op } = require("sequelize");
const { response } = require("express");

exports.createGroup = async (req, res, next) => {
  try {
    const groupName = req.body.groupName;
    const admin = req.user.name;
    const members = req.body.members;

    const group = await Group.create({ name: groupName, admin: admin });
    console.log(group);
    const invitedMembers = await User.findAll({
      where: {
        email: {
          [Op.or]: members,
        },
      },
    });

    (async () => {
      await Promise.all(
        invitedMembers.map(async (user) => {
          const response = await UserGroup.create({
            isadmin: false,
            userId: user.dataValues.id,
            groupId: group.dataValues.id,
          });
          console.log("resposne in create group:",response);
        })
      );
      

      await UserGroup.create({
        isadmin: true,
        userId: req.user.id,
        groupId: group.dataValues.id,
      });
    })();

    res.status(201).json({ group: group.dataValues.name, members: members });
  } catch (error) {
    console.log(error);
  }
};



exports.getUserGroups = async (req, res, next) => {
    try {
        // Fetch groups where the user is a member
        const userId = req.user.id; // Assuming you have user information stored in req.user
        console.log("userid",userId);
        const userGroups = await UserGroup.findAll({
            where: {
                userId: userId
            },
            include: Group // Include the Group model to fetch associated group data
        });
console.log(userGroups);

 // Extract group data from the userGroups array
 const groups = userGroups.map(userGroup => userGroup.group); // Use 'group' instead of 'Group'

 console.log("groups in controller:", groups);

        //end the groups as a response
        res.status(200).json({ groups });
    } catch (error) {
        console.error('Error fetching user groups:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// controllers/groupController.js

// Function to add a user to a group
exports.addUserToGroup = async (req, res) => {
  try {
    const { userId, groupId } = req.body;

    // Check if the requesting user is the admin of the group
    const isAdmin = await UserGroup.findOne({
      where: { userId: req.user.id, groupId, isAdmin: true }
    });

    if (!isAdmin) {
      return res.status(403).json({ error: 'Only group admin can perform this action' });
    }

    // Check if the user already belongs to the group
    const userGroupExists = await UserGroup.findOne({ where: { userId, groupId } });
    if (userGroupExists) {
      return res.status(400).json({ error: 'User is already a member of the group' });
    }

    // Add the user to the group
    await UserGroup.create({ userId, groupId, isAdmin: false });

    res.status(200).json({ message: 'User added to the group successfully' });
  } catch (error) {
    console.error('Error adding user to group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// controllers/groupController.js

// Function to remove a user from a group
exports.removeUserFromGroup = async (req, res) => {
  try {
    const { userId, groupId } = req.body;

    // Check if the requesting user is the admin of the group
    const isAdmin = await UserGroup.findOne({
      where: { userId: req.user.id, groupId, isAdmin: true }
    });

    if (!isAdmin) {
      return res.status(403).json({ error: 'Only group admin can perform this action' });
    }

    // Remove the user from the group
    await UserGroup.destroy({ where: { userId, groupId } });

    res.status(200).json({ message: 'User removed from the group successfully' });
  } catch (error) {
    console.error('Error removing user from group:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
// controllers/groupController.js

// Function to make a user an admin of the group
exports.makeUserAdmin = async (req, res) => {
  try {
    const { userId, groupId } = req.body;

    // Check if the requesting user is the admin of the group
    const isAdmin = await UserGroup.findOne({
      where: { userId: req.user.id, groupId, isAdmin: true }
    });

    if (!isAdmin) {
      return res.status(403).json({ error: 'Only group admin can perform this action' });
    }

    // Update the user's role to admin
    await UserGroup.update({ isAdmin: true }, { where: { userId, groupId } });

    res.status(200).json({ message: 'User is now an admin of the group' });
  } catch (error) {
    console.error('Error making user admin:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller method to fetch members of a group
exports.getGroupMembers = async (req, res) => {
    try {
        // Extract groupId from request parameters
        const { groupId } = req.params;
        
        // Find the group by its ID
        const group = await Group.findByPk(groupId);

        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        const members = await group.getUsers();
       
         // Extract member details
    const memberNames = members.map(member => ({ name: member.name }));

    res.json({ members: memberNames });
    } catch (error) {
        console.error('Error fetching group members:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
