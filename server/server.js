const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const moment = require('moment');
const {Users} = require('./utils/users');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

io.on('connection', (socket)=>{
    console.log('new user connected');
    socket.on('createMsg', (msg) => {
        console.log('msg', msg);

        io.emit('newMsg', {
            from: users.getUser(socket.id).name,
            text: msg.text,
            createdAt: msg.createdAt
        })
    });
    socket.on('createLocationMsg', (msg) => {
        console.log('msg', msg);
        var latitude = msg.latitude;
        var longitude = msg.longitude;
        io.emit('newLocationMsg', {
            from: users.getUser(socket.id).name,
            url: `https://www.google.com/maps?q=${latitude},${longitude}`,
            createdAt: msg.createdAt
        });
    });
    socket.on('join', (msg, fn)=> {
        console.log('msg', msg);
        var userName = msg.name;
        if(!(typeof(userName)=== 'string' && userName.trim().length>0)) {
            return fn('Invalid Username');
        }
        users.removeUser(socket.id);
        users.addUser(socket.id, userName);
        var newton = users.getUserList();
        io.emit('updateList', newton);
        socket.emit('newMsg', {
            from: 'Admin',
            text: `Welcome to Chat App :  ${userName}`,
            createdAt: msg.createdAt
        })
        socket.broadcast.emit('newMsg', {
            from: 'Admin',
            text: `New user joined :  ${userName}`,
            createdAt: msg.createdAt
        });
        fn();
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
         var user = users.removeUser(socket.id);
        if (user) {
            var newton = users.getUserList();
            io.emit('updateList', newton);
            io.emit('newMsg', {
                from :'Admin',
                text: `${user.name} has left.`});
        }
       
    });
    
});

server.listen(port, ()=> {
    console.log(`Server started on ${port}`);
})
