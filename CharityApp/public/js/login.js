document.addEventListener('DOMContentLoaded',()=>{
    const btnForgotPassword=document.getElementById('btn_forgot_password');
   
 
    document.getElementById('role').addEventListener('change', function() {
      var donorForm = document.getElementById('login-form');
      var charityForm = document.getElementById('charity-login-form');
      if (this.value === 'donor') {
          donorForm.classList.add('active');
          donorForm.classList.remove('inactive');
          charityForm.classList.add('inactive');
          charityForm.classList.remove('active');
      } else {
          charityForm.classList.add('active');
          charityForm.classList.remove('inactive');
          donorForm.classList.add('inactive');
          donorForm.classList.remove('active');
      }
  });
  function handleForgotClick() {
    window.location.href = '../views/forgotPassword.html'; // Adjust the path as per your file structure
  }
  
  btnForgotPassword.addEventListener("click", handleForgotClick);
   const btnSignUp = document.getElementById("btn_SignUp");
  
   function handleSignupClick() {
       window.location.href = "/views/signup.html"; // Adjust the path as per your file structure
   }
  
   btnSignUp.addEventListener("click", handleSignupClick);
   
   function getToken() {
    return localStorage.getItem('token');
  }
  
  function clearFields() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    console.log("field clear");
  }
  function displayErrorMessage(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = '*' + message;
    errorMessage.style.color = 'red';
    errorMessage.style.marginTop = '10px';
    errorMessage.style.fontSize = '12px';
    document.querySelector('#login-form label[for="email"]').insertAdjacentElement('beforebegin', errorMessage);
    alert(message);
  }
  
  document.getElementById('email').addEventListener('input', () => {
    const errorMessage = document.querySelector('#login-form p');
    if (errorMessage) {
        errorMessage.remove();
    }
  });
  
  document.getElementById('password').addEventListener('input', () => {
    const errorMessage = document.querySelector('#login-form p');
    if (errorMessage) {
        errorMessage.remove();
    }
  });
    document.getElementById('login-form').addEventListener('submit',async(e)=>{
           e.preventDefault();
            const email=document.getElementById('email').value;
            const password=document.getElementById('password').value;
        
           console.log("email,password:",{email,password});
        
           try{
            const response = await axios.post('/user/login',{
                email,password
            });
            const token=response.data;
             console.log("token in login ",token);
             console.log("token in login.js",response.data);
             localStorage.setItem('token',token);
            
            //  const token=JSON.parse(localStorage.getItem('token'));
        
            // If the login is successful, redirect the user to the home page
            if (response.status === 200) {
                alert('Login Successfull!');
            clearFields();
              window.location.href='/views/homePage.html';
            }
        
          // Clear the email and password fields
         
        
           }catch(error){
            console.log("error:",error);
            if (error.response && error.response.data && error.response.data.message) {
                displayErrorMessage(error.response.data.message);
            } else {
                displayErrorMessage('An unexpected error occurred.');
            } 
                 }
           })

           const charityLoginForm = document.getElementById('charity-login-form');

charityLoginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const charityEmail = document.getElementById('charity-email').value;
    const charityPassword = document.getElementById('charity-password').value;

    try {
        const response = await axios.post('/charity/login', {
            charityEmail,
            charityPassword
        });
        conslo
        const data = await response.data;

        if (data.success) {
            alert('Login successful!');
            window.location.href='/views/CharityProfile.html'; // Redirect to charity dashboard or profile page
        } else {
            alert('Invalid email or password');
        }
    } catch (error) {
        console.error(error);
        alert('Error logging in');
    }
});
        
  });
  