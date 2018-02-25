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

var locationButton = jQuery('#location');
locationButton.on('click', ()=> {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported');
    }
    navigator.geolocation.getCurrentPosition((location)=> {
        socket.emit('createLocationMsg', {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    }, (e)=> {
        console.log('Unable to fetch location');
    })
});

socket.on('newLocationMsg', (msg) => {
    // console.log(msg);
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="blank">My current location</a>')
    li.text(`${msg.from}:`);
    a.attr('href', msg.url);
    li.append(a);
    jQuery('#messages').append(li);
});


socket.on('disconnect', () => {
    console.log('disconnected from server');
});