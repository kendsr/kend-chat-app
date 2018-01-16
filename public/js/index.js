var socket = io();

socket.on('connect', function() {
    console.log('connected');
});

socket.on('disconnect', function() {
    console.log('disconnected');
});

socket.on('newMessage', function(message){
    console.log('received new message:', message);
});

socket.emit('createMessage', {
    from: 'Kend',
    text: 'Hi'
}, function(data){
    console.log("Got it", data);
});