const express = require('express');
const http = require('http');
const path = require('path')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');

const port = process.env.PORT || 5000;
const app = express();

const server = http.createServer(app)

const io = socketio(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    socket.on('joinRoom', ({username, room}) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);

        socket.emit('message', formatMessage('Admin', 'Benvenuto'));

        socket.broadcast.to(user.room).emit('message', formatMessage('Admin', user.username + ' è entrato nella chat'));
    
        io.to(user.room).emit('roomUsers', {room: user.room, users: getRoomUsers(user.room)});
    });

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message', formatMessage('Admin', user.username + ' si è disconnesso'));

            io.to(user.room).emit('roomUsers', {room: user.room, users: getRoomUsers(user.room)});
        }
    })

    socket.on('chatMessage', (msg) => {
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg));
    })
});



server.listen(port, () => {
    console.log('started on port: ' + port);
});