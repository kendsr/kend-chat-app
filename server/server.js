const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(path.join(__dirname, '../public')));

io.on('connection', (socket) => {
    console.log("New user connected");

    socket.on('createNewMessage', (newMessage) => {
        console.log('createMsg:',newMessage);
    });

    socket.emit('newMessage', {
        from: 'Bill',
        text: 'Testing new message',
        createdAt: 123
    });

    socket.on('disconnect', () => {
        console.log('client disconnected');
    }); 

});

server.listen(port, () => {console.log(`Server up on port ${port}`)});