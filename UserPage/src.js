const buttn=document.getElementById('butn');

function clickHandler(event){
    event.preventDefault();
    console.log("event");
    const username=document.getElementById('name').value;
    const useremail=document.getElementById('email').value;
    localStorage.setItem('UserNames',username);
   
    localStorage.setItem('UserEmailid',useremail);
    }
buttn.addEventListener('click',clickHandler);




