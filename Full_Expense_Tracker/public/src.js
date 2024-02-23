
function clearFields() {
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    console.log("field clear");
}

document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email= document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    console.log("name,email,password:", { name, email, password });
     try {
        const response = await axios.post('/users/signup', { name, email, password });
        console.log(response.data);
        
        clearFields();
        console.log("function");
    } catch (error) {
        console.error(error.response.data);
    }

});

document.getElementById('login-form').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;

   console.log("email,password:",{email,password});

   try{
    const response=axios.post('/users/login',{email,password});
    console.log(response.data);

    email.value='';
    password.value='';
   }catch(error){
    console.log("error:",error.response.data);
   }

});