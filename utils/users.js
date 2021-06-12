const users = [];

// Join user to chat
function userJoin(id, username, room) { // Join di un user nella comunicazione
    const user = {id, username, room};

    users.push(user);
    return user;
}

function getCurrentUser(id){ // Funzione che ritorna un user in base all'id
    return users.find(user => user.id===id);
}

function userLeave(id){ // Leave di un user dalla comunicazione
    const index = users.findIndex(user => user.id===id);

    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

function getRoomUsers(room){ // Funzione che ritorna tutti gli users presenti in una determinata stanza
    return users.filter(user => user.room===room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}