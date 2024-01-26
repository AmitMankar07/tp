const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));

app.get('/login', (req, res, next) => {
    res.send(`
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <button type="submit">Login</button>
        </form>
    `);
});

// Handle the login form submission
app.post('/login', (req, res, next) => {
    const username = req.body.username;
    
    if (username) {
        // Set username in local storage for later use
        res.send(`
            <script>
                localStorage.setItem('username', '${username}');
                window.location.href = '/';
            </script>
        `);
    } else {
        res.send("Please enter a valid username.");
    }
});

app.get('/', (req, res, next) => {
    fs.readFile('username.txt',(err,data)=>{
        if(err){
            console.log(err)
            data='No chat Happen yet';
        }
        res.send(`
       ${data} <form action="/" method="POST" onSubmit="updateUsername()">
       <input type="text" name="message" id="message" placeholder="Message">
       <input type="hidden" name="username" id="username" placeholder="Username"><br>
       <button type="submit">Send</button>
   </form>
   <script>
       function updateUsername() {
           var usernameInput = document.getElementById('username');
           var storedUsername = localStorage.getItem('username');
           if (storedUsername) {
               usernameInput.value = " "+storedUsername;
           }
       }
   </script>
    `);
    })
    
});

app.post("/",(req,res)=>{
    console.log(req.body.username);
    console.log(req.body.message);
    fs.writeFile("username.txt",`${req.body.username}: ${req.body.message}`,{flag:'a'},(err)=>
    err? console.log(err):res.redirect("/"));
});

app.listen(3000);