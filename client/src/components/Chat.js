import React, {useState, useEffect} from 'react';
import { Button } from 'react-bootstrap';

function Chat() {

    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('');

    useEffect(() => {
        function getSearchParameters() {
            var prmstr = window.location.search.substr(1);
            return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
        }
        
        function transformToAssocArray( prmstr ) {
            var params = {};
            var prmarr = prmstr.split("&");
            for ( var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split("=");
                params[tmparr[0]] = tmparr[1];
            }
            return params;
        }
    
        const params = getSearchParameters();

        setUsername(params['username']);
        setRoom(params['room']);
    }, [])

    

    return (
        <div>
            
        </div>
    )
}

export default Chat;