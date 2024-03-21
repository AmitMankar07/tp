const express=require('express');

const router=express.Router();

router.get('/login', (req, res, next) => {
    res.send(`
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Username" required>
            <button type="submit">Login</button>
        </form>
    `);
});
router.post('/login', (req, res, next) => {
    const username = req.body.username;
    
    if (username) {
        // You may want to store the username in session or cookies for a real application
        res.send(`
        <script>
        localStorage.setItem('username', '${username}');
        window.location.href = '/';
    </script>`);
    } else {
        res.send("Please enter a valid username.");
    }
});
module.exports=router;