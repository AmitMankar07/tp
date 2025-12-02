// document.addEventListener('DOMContentLoaded', () => {
    

// });


// Function to add a user to a group
// document.getElementById('add-user-button').addEventListener('click', async () => {
//     const groupId = document.getElementById('add-user-group-id').value;
//     const userId = document.getElementById('add-user-id').value;

//     try {
//         const response = await axios.post('/groups/addUserToGroup', { groupId, userId });
//         console.log(response.data.message);
//         // Handle success
//     } catch (error) {
//         console.error(error.response.data.error);
//         // Handle error
//     }
// });

// // Function to remove a user from a group
// document.getElementById('remove-user-button').addEventListener('click', async () => {
//     const groupId = document.getElementById('remove-user-group-id').value;
//     const userId = document.getElementById('remove-user-id').value;

//     try {
//         const response = await axios.post('/groups/removeUserFromGroup', { groupId, userId });
//         console.log(response.data.message);
//         // Handle success
//     } catch (error) {
//         console.error(error.response.data.error);
//         // Handle error
//     }
// });

// // Function to make a user an admin of the group
// document.getElementById('make-admin-button').addEventListener('click', async () => {
//     const groupId = document.getElementById('make-admin-group-id').value;
//     const userId = document.getElementById('make-admin-user-id').value;

//     try {
//         const response = await axios.post('/groups/makeUserAdmin', { groupId, userId });
//         console.log(response.data.message);
//         // Handle success
//     } catch (error) {
//         console.error(error.response.data.error);
//         // Handle error
//     }
// });