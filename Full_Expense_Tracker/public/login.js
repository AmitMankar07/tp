document.addEventListener('DOMContentLoaded',()=>{
    
function clearFields() {
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    console.log("field clear");
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
            const response = await axios.post('/users/login',{
                email,password
            })
             console.log(response.data);
            
        
            // If the login is successful, redirect the user to the home page
            if (response.status === 200) {
                alert('Login Successfull!');
                const successMessage = document.createElement('p');
                successMessage.textContent = 'Login successful!';
                successMessage.style.color = 'green';
                successMessage.style.marginTop = '10px';
                document.querySelector('#login-form label[for="email"]').insertAdjacentElement('beforebegin', successMessage);
              }
        
          // Clear the email and password fields
         clearFields();
        
           }catch(error){
            console.log("error:",error);
                // Display an error message to the user
                if (error.response.status === 400) { const errorMessage = document.createElement('p');
                errorMessage.textContent ='*'+ error.response.data.message;
                errorMessage.style.color = 'red';
                errorMessage.style.marginTop = '10px';
                errorMessage.style.fontSize = '12px';

                alert(error.response.data.message);
                document.querySelector('#login-form label[for="email"]').insertAdjacentElement('beforebegin', errorMessage);
             
               
                  } else if (error.response.status === 404) {
                 const errorMessage = document.createElement('p');
                  errorMessage.textContent ='*'+ error.response.data.message;
                  errorMessage.style.color = 'red';
                  errorMessage.style.marginTop = '10px';
                  errorMessage.style.fontSize = '12px';

                  alert(error.response.data.message);
                  document.querySelector('#login-form label[for="email"]').insertAdjacentElement('beforebegin', errorMessage);
               
                  } else if (error.response.status === 401) {const errorMessage = document.createElement('p');
                  errorMessage.textContent ='*'+ error.response.data.message;
                  errorMessage.style.color = 'red';
                  errorMessage.style.marginTop = '10px';
                  errorMessage.style.fontSize = '12px';

                  alert(error.response.data.message);
                  document.querySelector('#login-form label[for="email"]').insertAdjacentElement('beforebegin', errorMessage);
                      }
           }
        
})
});