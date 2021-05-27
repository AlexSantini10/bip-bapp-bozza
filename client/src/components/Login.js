import React, {useState} from 'react';
import { Button, Form } from 'react-bootstrap';
import { Redirect } from 'react-router';

function Login() {

    const [username, setUsername] = useState('');
    const [chat, setChat] = useState('');

    const onPhone = () => {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i
        ];
    
        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem);
        });
    }

    const styleSheet = () => {
        if (onPhone()){
            return({
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -80%)',
                width:'90%'
            })
        }
        else{
            return({
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
                width:'30%'
            })
        }
    }

    const login = (e) => {
        e.preventDefault();

        window.location.replace('/chat?username=' + username + '&room=' + chat)
    }

    return (
        <div style={styleSheet()}>
            <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control onChange={event => setUsername(event.target.value)} type="text" placeholder="Enter Useraname" />
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Chat name</Form.Label>
                <Form.Control onChange={event => setChat(event.target.value)} type="text" placeholder="Enter Chat name" />
            </Form.Group>

            <Button onClick={login} variant="primary" type="submit">
                Submit
            </Button>
            </Form>
        </div>
    )
}

export default Login;