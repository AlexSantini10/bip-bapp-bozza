const socket = io();
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const {username, room} = Qs.parse(location.search, { // Ottiene username e nome della stanza dall'url
	ignoreQueryPrefix: true
});

//console.log(username, room); // Solo debug

socket.emit('joinRoom', {username, room}); // Emissione del segnale per entrare in una stanza

socket.on('roomUsers', ({room, users}) => { // Ricezione del segnale degli utenti presenti in stanza
	//console.log(room); // Debug
	outputRoomName(room); // Stampa del nome della stanza a schermo
	outputUsers(users); // Stampa degli utenti
})

socket.on('message', (message) => { // Ricezione di un messaggio
	outputMessage(message); // Stampa del messaggio

	chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll verso il basso
});

document.addEventListener('DOMContentLoaded', (e) => { // Evento che viene sollevato al caricamento del documento
	const chatForm = document.getElementById('chat-form');

	chatForm.addEventListener('submit', (e) => { // Quando si vuole inviare un messaggio
		e.preventDefault();

		const msg = e.target.elements.msg.value;

		socket.emit('chatMessage', msg); // Messaggio inviato al server

		e.target.elements.msg.value = ''; // Azzeramento del form dei messaggi
		e.target.elements.msg.focus(); // Reindirizzamento del focus sul form dei messaggi
	})
});

function outputMessage(message){ // Funzione di stampa a schermo dei messaggi
	var div = document.createElement('div');
	div.classList.add('message');
	
	var meta = document.createElement('p');
	meta.classList.add('meta');
	meta.innerHTML = message.username + ' <span>'+ message.time +'</span>';

	var messP = document.createElement('p');
	messP.classList.add('text');
	messP.innerHTML = message.text;

	div.appendChild(meta);
	div.appendChild(messP);

	document.querySelector('.chat-messages').appendChild(div);
}

function outputRoomName(room){ // Funzione di stampa del nome della stanza
	roomName.innerText = room;
}

function outputUsers(users){ // Funzione di stampa degli users presenti
	userList.innerHTML = '' + users.map(user => '<li>' + user.username + '</li>').join('');
}