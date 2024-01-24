const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// In-memory storage for usernames
const userStore = {};

// Serve the login form
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Serve the main chat page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chat.html'));
});

// Handle login and redirect to the main chat page
app.post('/login', (req, res) => {
    const username = req.body.username;
    if (username) {
        // Store username in memory
        userStore[req.ip] = username;
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

// Handle sending messages
app.post('/sendMessage', (req, res) => {
    // Get username from memory using client's IP address
    const username = userStore[req.ip];
    const message = req.body.message;

    if (username && message) {
        // Ensure messages.json file exists
        const filePath = 'messages.json';
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]');
        }

        // Read, update, and write messages
        const messages = JSON.parse(fs.readFileSync(filePath, 'utf8')) || [];
        messages.push({ username, message });
        fs.writeFileSync(filePath, JSON.stringify(messages));
    }

    res.sendStatus(200);
});

// Read messages from the file and send to the client
app.get('/getMessages', (req, res) => {
    try {
        const filePath = 'messages.json';
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '[]');
        }

        const messages = JSON.parse(fs.readFileSync(filePath, 'utf8')) || [];
        res.json(messages);
    } catch (error) {
        console.error("Error reading messages.json:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
