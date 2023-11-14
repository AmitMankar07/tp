var buttn=document.getElementById('butn');
var itemList=document.getElementById('users');

buttn.addEventListener('click',clickHandler);
itemList.addEventListener('click',addItems);

function clickHandler(event){
    event.preventDefault();
    console.log("event");
    const username=document.getElementById('name').value;
    const useremail=document.getElementById('email').value;
    const usernumber=document.getElementById('Phone').value;
    const user = {
        username,
        useremail,
        usernumber
      };
      const userJson = JSON.stringify(user);

      localStorage.setItem(useremail, userJson);

      var newItem=username+"-"+useremail+"-"+usernumber;
      const li = document.createElement('li');
      li.className = 'items';
      li.appendChild(document.createTextNode(newItem));
    
      itemList.appendChild(li);
    }

  //   function addItems(e){
  //     e.preventDefault();
  //      // Retrieve the users list from the local storage.
  // const users = JSON.parse(localStorage.getItem('Users') || []);

  // // Clear the existing users list.
  // itemList.innerHTML = '';

  // // Iterate over the users list and display the user details in a list.
  //   for (const user of users) {
  //   const li = document.createElement('li');
  //   li.className = 'items';
  //   li.appendChild(document.createTextNode((user.username)+"-"+(user.useremail)+"-"+(user.usernumber)));

  //   itemList.appendChild(li);
  //   }
  
   
  //  }
  
  