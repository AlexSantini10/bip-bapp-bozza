const moment = require('moment');

function formatMessage(username, text) { // Formattazione di un messaggio
    return{
        username,
        text,
        time:moment().format('HH:mm')
    }
}

module.exports = formatMessage;