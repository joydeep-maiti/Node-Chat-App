const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

io.on('connection', (socket)=>{
    console.log('new user connected');
    // socket.emit('newMsg',{
    //     from: 'abc', 
    //     text: 'new msg'
    // });
    socket.on('createMsg', (msg) => {
        console.log('msg', msg);
        io.emit('newMsg', {
            from: 'User',
            text: msg.text
        })
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
});

server.listen(port, ()=> {
    console.log(`Server started on ${port}`);
})
