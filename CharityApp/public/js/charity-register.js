// import axios from 'axios';

const charityRegisterForm = document.getElementById('charity-register-form');

charityRegisterForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const description = document.getElementById('description').value;

  try {
    const response = await axios.post('/charity/register', {
      name,
      email,
      description
    });

    const data = await response.data;


    if (data.success) {
      alert('Charity registered successfully!');
      charityRegisterForm.reset();
    } else {
      alert('Error registering charity: ' ,data.error);
    }
  } catch (error) {
    console.error(error);
    alert('Error registering charity: ' ,error.message);
  }
`
`});