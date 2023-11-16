var buttn=document.getElementById('butn');
var itemList=document.getElementById('users');

buttn.addEventListener('click',clickHandler);
itemList.addEventListener('click',removeItem);
itemList.addEventListener('click',editItem);

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

        //new item
      var newItem=username+"-"+useremail+"-"+usernumber;
      const li = document.createElement('li');
      li.className = 'items';
      li.appendChild(document.createTextNode(newItem));
      
      //delete butn
      var delbtn=document.createElement('button');
      delbtn.className="delete float-right";
      delbtn.appendChild(document.createTextNode('delete'));
      li.appendChild(delbtn);

      //edit buutn
      var editbutn=document.createElement('button');
      editbutn.className="edit float-right";
      editbutn.appendChild(document.createTextNode('edit'));
      li.appendChild(editbutn);

      itemList.appendChild(li);
  
    }
    function removeItem(e){
      if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li=e.target.parentElement;
            itemList.removeChild(li);
        }
    }
    }

    function editItem(e){
      if(e.target.classList.contains('edit')){
         
    const listItem = e.target.parentElement;
    const userText = listItem.textContent;
    const [username, userEmail, userNumber] = userText.split('-');

    localStorage.removeItem(userEmail);
    
    document.getElementById('name').value = username;
    document.getElementById('email').value = userEmail;
    document.getElementById('Phone').value = userNumber;

    itemList.removeChild(listItem);
      }
    }
