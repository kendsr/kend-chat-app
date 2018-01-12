var socket = io();

socket.on('connect', function() {
    console.log('connected');

    socket.emit('createNewMessage',{
        message: "This is for everyone."
    });
});

socket.on('disconnect', function() {
    console.log('disconnected');
});

socket.on('newMessage', function(newMessage){
    console.log('received new message:', newMessage);
});
