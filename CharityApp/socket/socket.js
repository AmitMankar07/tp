const io = require('socket.io')();

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('new-charity', (charity) => {
        // Emit the new charity event to all connected clients
        io.emit('new-charity', charity);
    });
});

module.exports = io;