var socket = io();
socket.on('connect', ()=> {
    console.log('connected to server');   
});

function scrollToButtom () {
    var messages = jQuery('#messages');
    var newMessage = messages.child('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollHeight = messages.prop('scrollHeight');
    var scrollTop = messages.prop('scrollTop');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if( clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}
socket.on('newMsg', (msg)=> {
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: msg.text,
        from: msg.from,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html);
    scrollToButtom();
});

jQuery('#message-form').on('submit', (e) => {
    e.preventDefault();
    socket.emit('createMsg', {
        to: 'abc',
        text: jQuery('[name=msg]').val(),
        createdAt: moment().valueOf()
    });
    // console.log();
});

var locationButton = jQuery('#send-location');
locationButton.on('click', ()=> {
    if(!navigator.geolocation) {
        return alert('Geolocation not supported');
    }
    navigator.geolocation.getCurrentPosition((location)=> {
        socket.emit('createLocationMsg', {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            createdAt: moment().valueOf()
        });
    }, (e)=> {
        console.log('Unable to fetch location');
    })
});

socket.on('newLocationMsg', (msg) => {
    // console.log(msg);
    var formattedTime = moment(msg.createdAt).format('h:mm a');
    var template = jQuery('#locationmessage-template').html();
    var html = Mustache.render(template, {
        url: msg.url,
        from: msg.from,
        createdAt: formattedTime
    })
    jQuery('#messages').append(html);
    scrollToButtom();
});


socket.on('disconnect', () => {
    console.log('disconnected from server');
});