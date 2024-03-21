const express=require('express');
const data=require('./data');

const router=express.Router();

router.get('/',(req,res,next)=>{

    const username = `<script>document.write(localStorage.getItem('username'));</script>`;
   
    res.send(`
    <form action="/" method="POST">
        <input id="message" name="message" type="text" placeholder="Message">
        <button type="submit">Send</button>
    </form>
    <div id="messages">
        ${data.map(message => `<div>${message.username}: ${message.message}</div>`).join('')}
    </div>
    <script>
        // Ensure username is not 'null'
        var username = localStorage.getItem('username') || '';
        // If username is not 'null', display it; otherwise, display 'undefined'
        document.getElementById('messages').innerHTML += '<div>' + (username !== 'null' ? username : 'undefined') + ': hi</div>';
        
        // Scroll to the bottom of the messages div
        var messagesDiv = document.getElementById('messages');
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    </script>
`);
});

router.post('/',(req,res,next)=>{ 
    const newMessage = {
    username: req.body.username,
    message: req.body.message
};

data.push(newMessage);
console.log(data);

console.log(`${newMessage.username}:${newMessage.message}`);
    res.redirect('/');
})

module.exports=router;