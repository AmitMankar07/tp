document.addEventListener('DOMContentLoaded',()=>{

    function clearFields() {
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
        console.log("field clear");
    }
    document.getElementById('email').addEventListener('input', () => {
        const errorMessage = document.querySelector('#signup-form p');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
    
    document.getElementById('role').addEventListener('change', function() {
        var donorForm = document.getElementById('signup-form');
        var charityForm = document.getElementById('charity-form');
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
    
    document.getElementById('password').addEventListener('input', () => {
        const errorMessage = document.querySelector('#signup-form p');
        if (errorMessage) {
            errorMessage.remove();
        }
    });
    document.getElementById("btn_Login").addEventListener("click", function() {
        window.location.href = "/views/login.html";
    });
    document.getElementById('signup-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email= document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const mobileno=document.getElementById('mobilenum').value;
        console.log("name,email,password,mobileno:", { name, email, password ,mobileno});
         
        if (!name || !email || !password || !mobileno) {
            alert('Please fill out all fields');
            return;
        }
        
        try {
            const response = await axios.post('/user/signUp', { name, email, password,mobileno });
            console.log(response);
            console.log(response.data);
            alert('Sign Up Successfull!');
            clearFields();
            window.location.href = "/views/login.html";
            console.log("function");
        } catch (error) {
            // console.error(error.response.data);
            //         // Create an error message element
            //         const errorMessage = document.createElement('p');
            //         errorMessage.textContent = error.response.data.message;
            //         errorMessage.style.color = 'red';
            
            //         // Append the error message element to the signup form
            //         document.getElementById('signup-form').appendChild(errorMessage);
                
            if (error.response) {
                console.error(error.response.data);
                const errorMessage = document.createElement('p');
                errorMessage.textContent = error.response.data.message;
                errorMessage.style.color = 'red';
                document.getElementById('signup-form').appendChild(errorMessage);
              } else {
                console.error(error);
                const errorMessage = document.createElement('p');
                errorMessage.textContent = 'An unknown error occurred.';
                errorMessage.style.color = 'red';
                document.getElementById('signup-form').appendChild(errorMessage);
              }
        }
    
        });
        const charityForm = document.getElementById('charity-form');

charityForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const charityName = document.getElementById('charity-name').value;
  const charityEmail = document.getElementById('charity-email').value;
  const charityMobileNum = document.getElementById('charity-mobilenum').value;
  const charityPassword = document.getElementById('charity-password').value;
  const charityDescription = document.getElementById('charity-description').value;

  try {
    const response = await axios.post('/charity/register', {
      charityName,
      charityEmail,
      charityMobileNum,
      charityPassword,
      charityDescription
    });

    const data = await response.data;
console.log("data",response);
    if (data.success) {
      alert('Charity registered successfully!');
    //   charityForm.reset();
      window.location.href = "/views/login.html";
    } else {
      alert('Error registering charity: ' + data.error);
    }
  } catch (error) {
    console.error(error);
    alert('Error registering charity: ' + error.message);
  }
});
    }); 

//     function clearFields() {
//         document.getElementById('name').value = '';
//         document.getElementById('email').value = '';
//         document.getElementById('password').value = '';
//         console.log("field clear");
//     }
//     document.getElementById('email').addEventListener('input', () => {
//         const errorMessage = document.querySelector('#signup-form p');
//         if (errorMessage) {
//             errorMessage.remove();
//         }
//     });

//     document.getElementById('role').addEventListener('change', function() {
//         var donorForm = document.getElementById('donor-form');
//         var charityForm = document.getElementById('charity-form');
//         if (this.value === 'donor') {
//             donorForm.classList.add('active');
//             donorForm.classList.remove('inactive');
//             charityForm.classList.add('inactive');
//             charityForm.classList.remove('active');
//         } else {
//             charityForm.classList.add('active');
//             charityForm.classList.remove('inactive');
//             donorForm.classList.add('inactive');
//             donorForm.classList.remove('active');
//         }
//     });
    
//     document.getElementById('password').addEventListener('input', () => {
//         const errorMessage = document.querySelector('#signup-form p');
//         if (errorMessage) {
//             errorMessage.remove();
//         }
//     });
//     document.getElementById("btn_Login").addEventListener("click", function() {
//         window.location.href = "/views/login.html";
//     });
//     document.getElementById('signup-form').addEventListener('submit', async (event) => {
//         event.preventDefault();
//         const name = document.getElementById('name').value;
//         const email= document.getElementById('email').value;
//         const password = document.getElementById('password').value;
//         const mobileno=document.getElementById('mobilenum').value;
//         console.log("name,email,password,mobileno:", { name, email, password ,mobileno});
         
//         if (!name || !email || !password || !mobileno) {
//             alert('Please fill out all fields');
//             return;
//         }
        
//         try {
//             const response = await axios.post('/user/signUp', { name, email, password,mobileno });
//             console.log(response.data);
//             alert('Sign Up Successfull!');
//             clearFields();
//             window.location.href = "/views/login.html";
//             console.log("function");
//         } catch (error) {
//             console.error(error.response.data);
//                     // Create an error message element
//                     const errorMessage = document.createElement('p');
//                     errorMessage.textContent = error.response.data.message;
//                     errorMessage.style.color = 'red';
            
//                     // Append the error message element to the signup form
//                     document.getElementById('signup-form').appendChild(errorMessage);
                
//         }
    
//     });
    // });