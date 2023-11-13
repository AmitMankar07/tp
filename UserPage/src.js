const buttn=document.getElementById('butn');



function clickHandler(event){
    event.preventDefault();
    console.log("event");
    const username=document.getElementById('name').value;
    const useremail=document.getElementById('email').value;
    const user = {
        username,
        useremail,
      };
    
      
      const userJson = JSON.stringify(user);
    
     
      localStorage.setItem('User', userJson);
    }
    
buttn.addEventListener('click',clickHandler);




