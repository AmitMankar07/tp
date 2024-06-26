const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const charityList = document.getElementById('charity-list');


loadCharities();

searchForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();
    try {
        const response = await axios.get(`/charities?search=${searchTerm}`);
        const charities = response.data;
        charityList.innerHTML = '';
        charities.forEach(charity => {
          const tableRow = document.createElement('tr');
          tableRow.innerHTML = `
            <td>${charity.name}</td>
            <td>${charity.email}</td>
            <td>${charity.description}</td>
            <td><button class="donate-btn" data-charity-id="${charity.id}">Donate</button></td>
          `;
          const table = document.querySelector('.charity-table');
          table.appendChild(tableRow);
        });
      }catch(error){
        console.error(error);
       } 
});

// Load all charities
async function loadCharities() {
    try {
      const response = await axios.get('/charities');
      console.log("resposne get charities",response);
      const charities = response.data;
      charityList.innerHTML = '';

      const table = document.createElement('table');
    table.className = 'charity-table';
    const tableHead = `
      <tr>
        <th>Charity Name</th>
        <th>Email</th>
        <th>Description</th>
        <th>Donate</th>
      </tr>
    `;
    table.innerHTML = tableHead;

      charities.forEach(charity => {
        const tableRow = document.createElement('tr');
      tableRow.innerHTML = `
        <td>${charity.name}</td>
        <td>${charity.email}</td>
        <td>${charity.description}</td>
        <td><button class="donate-btn" data-charity-id="${charity.id}">Donate</button></td>
      `;
      table.appendChild(tableRow);
    });
    charityList.appendChild(table);
    
    } catch (error) {
      console.error(error);
    }
  }
  const token=localStorage.getItem('token');

        const decodeToken=parseJwt(token);
        function parseJwt (token) {
          if(!token){
              return null;
          }
          console.log("token in parsejwt",token);
          // var base64Url = token;
          var base64Url = token.split('.')[1];
          console.log("base64url:",base64Url);
          var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
      
          return JSON.parse(jsonPayload);
      }
      
  charityList.addEventListener('click', async(e) => {
    if (e.target.classList.contains('donate-btn')) {
      const charityId = e.target.dataset.charityId;
      const charityName = e.target.parentNode.parentNode.querySelector('td:nth-child(1)').textContent;
      const dialog = document.createElement('div');
      dialog.innerHTML = `
        <h2>Donate to ${charityName}</h2>
        <label for="amount">Enter amount:</label>
        <input type="number" id="amount" min="1" />
        <button id="donate-btn">Donate</button>
      `;
      dialog.className = 'donate-dialog';
      document.body.appendChild(dialog);
      const donateBtn = dialog.querySelector('#donate-btn');
      donateBtn.addEventListener('click', async() => {
        const amount = dialog.querySelector('#amount').value;
        if (amount > 0) {
          try {
            const response = await axios.post('/create-order', {
              charityId,
              amount,
            },{ headers: {"Authorization" : token} });
            console.log("post order :",response);
            const orderId = response.data.orderId;
            const razorpayKey = response.data.razorpayKey;
            const options = {
              key: razorpayKey, // Get the Razorpay key from the server
              amount: amount * 100, // Convert to paise
              currency: 'INR',
              name: 'Donation to Charity',
              description: `Donation to charity ${charityName}`,
              order_id: orderId,
              handler: async(response) => {
                try {
                  const paymentId = response.razorpay_payment_id;
                  const signature = response.razorpay_signature;
                  // const paymentResponse = await verifyPayment(paymentId, signature);
                  await axios.post('/update-donation', { headers: { "Authorization": token } }, {
                    orderId,
                    paymentId,
                    signature,
                    status: 'success',
                  });
                } catch (error) {
                  console.error(error);
                  await axios.post('/update-donation', {
                    orderId,
                    paymentId,
                    signature,
                    status: 'uccess',
                  }, { headers: { "Authorization": token } });
                }
              },
              prefill: {
                name: 'Donor Name',
                email: 'donor@example.com',
                contact: '9999999999',
              },
              notes: {
                address: 'Donor address',
              },
              theme: {
                color: '#F37254',
              },
            };
            const rzp1 = new Razorpay(options);
            rzp1.open();
            dialog.remove();
          } catch (error) {
            console.error(error);
          }
        } else {
          alert('Please enter a valid amount');
        }
      });
    }
  });
  
async function createOrder(charityId, amount) {
  try {
    const response = await axios.post('/create-order', {
      charityId,
      amount,
    });
    return response.data.orderId;
  } catch (error) {
    console.error(error);
  }
}
async function verifyPayment(paymentId, signature) {
  try {
    const response = await axios.post('/verify-payment', {
      paymentId,
      signature,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
// donation page script
const donationForm = document.getElementById('donation-form');

donationForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    const charityId = donationForm.dataset.charityId;
    const amount = document.getElementById('amount').value;
    try {
        const response = await axios.post(`/donate/${charityId}`, { amount });
        // handle payment response
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
});