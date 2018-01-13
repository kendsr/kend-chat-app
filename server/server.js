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

    // socket.emit from Admin text Welcome to chat app
    socket.emit('newMessage', {
        From:'Admn', 
        text:'Welcome to chat app',
        createdAt: new Date().getTime()
    });
    // socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage', {
        from:'Admin', 
        text:'New User Joined',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (message) => {
        console.log('createMsg:',message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('client disconnected');
    }); 

});

server.listen(port, () => {console.log(`Server up on port ${port}`)});