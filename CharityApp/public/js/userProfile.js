// script.js
const profileInfoElement = document.getElementById('profile-info');
const profileNameElement = document.getElementById('profile-name');
const profileEmailElement = document.getElementById('profile-email');
const updateProfileBtn = document.getElementById('update-profile-btn');
const updateProfileForm = document.getElementById('update-profile-form');

const getDonationHistoryBtn = document.getElementById('get-donation-history-btn');
const donationHistoryList = document.getElementById('donation-history-list');
const errorMessageElement = document.getElementById('error-message');

const token = localStorage.getItem("token");
const decodedToken = decodeToken(token);
const userId = decodedToken.userId;
console.log("userid:",userId);

getDonationHistoryBtn.addEventListener('click', async () => {
    try {
      const response = await axios.get('/donation-history',{ headers: { Authorization: token }} );
      const donations = response.data;
      donationHistoryList.innerHTML = '';
      donations.forEach((donation) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Donation of $${donation.amount} to ${donation.charityName} on ${donation.date}`;
        donationHistoryList.appendChild(listItem);
      });
    } catch (error) {
        console.log(error);
    }
  });

function decodeToken(token) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  
    return JSON.parse(jsonPayload);
  }

async function getProfile() {
    try {
        const response = await axios.get('/user/get-profile',{ headers: { Authorization: token }} );
        const userProfile = response.data.user;
        profileNameElement.textContent = `Name: ${userProfile.name}`;
        profileEmailElement.textContent = `Email: ${userProfile.email}`;
    } catch (error) {
        console.error(error);
    }
}

getProfile();

updateProfileBtn.addEventListener('click', () => {
    updateProfileForm.style.display = 'block';
});

updateProfileForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    try {
        const response = await axios.put('/user/update-profile', {
            name,
            email,
        },
        { headers: { Authorization: token }});
        alert('Profile updated successfully!');
        updateProfileForm.style.display = 'none';
    } catch (error) {
        console.error(error);
    }
});