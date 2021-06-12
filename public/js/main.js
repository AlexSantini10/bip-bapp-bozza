const socket = io();
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const {username, room} = Qs.parse(location.search, {
	ignoreQueryPrefix: true
});

console.log(username, room);

socket.emit('joinRoom', {username, room});

socket.on('roomUsers', ({room, users}) => {
	console.log(room);
	outputRoomName(room);
	outputUsers(users);
})

socket.on('message', (message) => {
	outputMessage(message);

	chatMessages.scrollTop = chatMessages.scrollHeight;
});

document.addEventListener('DOMContentLoaded', (e) => {
	const chatForm = document.getElementById('chat-form');

	chatForm.addEventListener('submit', (e) => {
		e.preventDefault();

		const msg = e.target.elements.msg.value;

		socket.emit('chatMessage', msg);

		e.target.elements.msg.value = '';
		e.target.elements.msg.focus();
	})
});

function outputMessage(message){
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

function outputRoomName(room){
	roomName.innerText = room;
}

function outputUsers(users){
	userList.innerHTML = '' + users.map(user => '<li>' + user.username + '</li>').join('');
}