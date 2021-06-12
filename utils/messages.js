const moment = require('moment');

function formatMessage(username, text) {
    return{
        username,
        text,
        time:moment().format('HH:mm')
    }
}

module.exports = formatMessage;