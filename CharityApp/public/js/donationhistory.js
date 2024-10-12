// donationhistory.js

// import axios from 'axios';

// Get the donation history table element
const donationHistoryTable = document.getElementById('donation-history-table');

// Function to display donation history
function displayDonationHistory(donations) {
  const tbody = donationHistoryTable.querySelector('tbody');
  tbody.innerHTML = '';

  donations.forEach((donation) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${donation.createdAt}</td>
      <td>${donation.projectId}</td>
      <td>${donation.amount}</td>
    `;
    tbody.appendChild(row);
  });
}

// Function to get donation history from server
async function getDonationHistory() {
  try {
    const response = await axios.get('/api/donationhistory');
    console.log("get donation history:",response);
    const donations = response.data;
    displayDonationHistory(donations);
  } catch (error) {
    console.error(error);
  }
}

// Function to post new donation to server
async function postNewDonation() {
  try {
    const amount = document.getElementById('amount-input').value;
    const projectId = document.getElementById('project-id-input').value;

    const response = await axios.post('/api/donations', { amount, projectId });
    const newDonation = response.data;
    displayDonationHistory([newDonation]);
  } catch (error) {
    console.error(error);
  }
}
getDonationHistory();
// Add event listener to post new donation button
document.getElementById('post-donation-btn').addEventListener('click', postNewDonation);

// Get donation history on page load
