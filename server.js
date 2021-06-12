const express = require('express');
const http = require('http');
const path = require('path')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require('./utils/users');

const port = process.env.PORT || 5000;
const app = express();

const server = http.createServer(app) // Creazione di un server express

const io = socketio(server); // Creazione di un server socket.io

app.use(express.static(path.join(__dirname, 'public'))); // Middleware per la cartella public

io.on('connection', (socket) => { // Ricezione di una connessione socket

    socket.on('joinRoom', ({username, room}) => { // Ricezione di un evento joinRoom
        const user = userJoin(socket.id, username, room); // 

        socket.join(user.room);

        socket.emit('message', formatMessage('Admin', 'Benvenuto')); // Invio del messaggio di benvenuto

        socket.broadcast.to(user.room).emit('message', formatMessage('Admin', user.username + ' è entrato nella chat')); // Segnala agli altri user di questa stanza un ingresso
    
        io.to(user.room).emit('roomUsers', {room: user.room, users: getRoomUsers(user.room)}); // Reinvia agli user di quella stanza la lista degli utenti
    });

    socket.on('disconnect', () => { // Disconnessione di un utente
        const user = userLeave(socket.id);

        if(user){
            io.to(user.room).emit('message', formatMessage('Admin', user.username + ' si è disconnesso')); // Segnala agli altri user un'uscita

            io.to(user.room).emit('roomUsers', {room: user.room, users: getRoomUsers(user.room)}); // Reinvia agli user di quella stanza la lista degli utenti
        }
    })

    socket.on('chatMessage', (msg) => { // Ricezione di un messaggio
        const user = getCurrentUser(socket.id);

        io.to(user.room).emit('message', formatMessage(user.username, msg)); // Invio a tutti i membri di una stanza del messaggio
    })
});



server.listen(port, () => {
    console.log('started on port: ' + port);
});

// Grafica presa da: https://youtu.be/jD7FnbI76Hg