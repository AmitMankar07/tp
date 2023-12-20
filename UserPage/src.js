var buttn=document.getElementById('butn');
var itemList=document.getElementById('users');

let x=2;
console.log("hello");

buttn.addEventListener('click',clickHandler);
itemList.addEventListener('click',removeItem);
itemList.addEventListener('click',editItem);

document.addEventListener('DOMContentLoaded', retrieveData);

function retrieveData() {
  axios.get("https://crudcrud.com/api/91c69c91db9444bd8a376890c4db334f/appointmentData")
    .then((response) => {
      response.data.forEach((user) => {
        addItemToList(user.username, user.useremail, user.usernumber,user._id);
      });
    })
    .catch(err => {
      console.log(err);
    });
}

function addItemToList(username, useremail, usernumber,userId) {
  var newItem = username + "-" + useremail + "-" + usernumber;
  const li = document.createElement('li');
  li.id=userId;
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

      //post data into the crud server
      axios.post("https://crudcrud.com/api/91c69c91db9444bd8a376890c4db334f/appointmentData",user)
      .then((response)=>{
        console.log(response)
      })
      .catch(err=>{
        console.log(err);
      })

      //get data from the crud
      
      //localStorage.setItem(useremail, userJson);
      
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
            var userId=li.id;
            axios.delete(`https://crudcrud.com/api/91c69c91db9444bd8a376890c4db334f/appointmentData/${userId}`)
        .then((response) => {
          console.log(response);
          
        })
        .catch((error) => {
          console.log(error);
        });
        itemList.removeChild(li);
       
        }
    }
    }

    function editItem(e){
      if(e.target.classList.contains('edit')){
         
    const listItem = e.target.parentElement;
    const userText = listItem.textContent;
    const [username, userEmail, userNumber] = userText.split('-');
        const userId=listItem.id;
    
        axios.delete(`https://crudcrud.com/api/91c69c91db9444bd8a376890c4db334f/appointmentData/${userId}`)
        .then((response) => {
          console.log(response);
          itemList.removeChild(listItem);
        })
        .catch((error) => {
          console.log(error);
        });
        document.getElementById('name').value = username;
        document.getElementById('email').value = userEmail;
        document.getElementById('Phone').value = userNumber;
      }
    }
