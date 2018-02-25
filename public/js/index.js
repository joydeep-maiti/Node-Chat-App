var socket = io();
socket.on('connect', ()=> {
    console.log('connected to server');
    socket.emit('createMsg', {
        to: 'abc',
        text: 'msg'
    });
});
socket.on('newMsg', (msg)=> {
    console.log(msg);
})

socket.on('disconnect', () => {
    console.log('disconnected from server');
});