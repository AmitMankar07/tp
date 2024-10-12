// Import axios library


// Get the elements from the HTML
const usersStat = document.querySelector('.stats .stat:nth-child(1) p');
const charitiesStat = document.querySelector('.stats .stat:nth-child(2) p');
const donationsStat = document.querySelector('.stats .stat:nth-child(3) p');
const recentActivityList = document.querySelector('ul');

// Function to get the list of users
async function getUsers() {
  try {
    const response = await axios.get('/api/users');
    const users = response.data;
    console.log("users",users);
    usersStat.textContent = users.totalCount;
    return users;
  } catch (error) {
    console.error(error);
  }
}

// Function to get the list of charities
async function getCharities() {
  try {
    const response = await axios.get('/api/charities');
    const charities = response.data;
    console.log(charities);
    charitiesStat.textContent = charities.length;
    return charities;
  } catch (error) {
    console.error(error);
  }
}

async function getDonations() {
  try {
    const response = await axios.get('/api/donations/total');
    const totalDonations = response.data.totalDonations;
    console.log(totalDonations);
    donationsStat.textContent = `$${totalDonations.toFixed(2)}`;
  } catch (error) {
    console.error(error);
  }
}

// Function to get the recent activity
async function getRecentActivity() {
  try {
    const response = await axios.get('/api/recent-activity');
    const activity = response.data;
    recentActivityList.innerHTML = '';
    activity.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.textContent = item.message;
      recentActivityList.appendChild(listItem);
    });
  } catch (error) {
    console.error(error);
  }
}

// Call the functions to get the data
getUsers();
getCharities();
getDonations();
getRecentActivity();
