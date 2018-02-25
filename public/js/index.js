var socket = io();
socket.on('connect', ()=> {
    console.log('connected to server');
    // socket.emit('createMsg', {
    //     to: 'abc',
    //     text: 'msg'
    // });
    
});
socket.on('newMsg', (msg)=> {
    // console.log(msg);
    var li = jQuery('<li></li>');
    li.text(`${msg.from}:${msg.text}`);
    jQuery('#messages').append(li);
});

jQuery('#msg-create').on('submit', (e) => {
    e.preventDefault();
    socket.emit('createMsg', {
        to: 'abc',
        text: jQuery('[name=msg]').val()
    });
    // console.log();
});


socket.on('disconnect', () => {
    console.log('disconnected from server');
});