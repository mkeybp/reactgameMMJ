// import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import React, { useState } from 'react';
import useGameServer from './useGameServer';
// import GameWindow from "./app"
// let logginIn = "";
let authToken = "";
let gameHubUrl = "http://jats.web.eadania.dk/gamehub"
let loginSuccess;

// props her
function Login(props) {
    // let message = document.getElementById("message");
    // let errormessage = document.getElementById("errormessage");

    // for testing
    const [username, setUsername] = useState("MMJ");
    const [password, setPassword] = useState("Dreamteam");
    // const [error, setError] = useState(null);
    // const [token, setToken] = useState("");
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    const gameServer = useGameServer(gameHubUrl, authToken, onConnectionClosed);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }


    function handleSubmit(event) {
        // setError(null);
        event.preventDefault();
        LoginConnect('http://jats.web.eadania.dk/authentication/login', { username, password })
            .then(data => {
                authToken = data.data;
                loginSuccess = data.success;
                if (data.success) {
                    // setToken(tokenId)
                    console.log(authToken);
                    // message.innerHTML = "<i style='color:green'>YOU ARE NOW LOGGED IN</i>";
                    
                    gameServer.connect();
                    
                }
                else {
                    // message.innerHTML = "<i style='color:red'>WRONG LOGIN, TRY AGAIN</i>";
          

                }
            })

        // .catch(error => {
        //     if (data.success === "true") setError(error.response.data.message);
        //     else setError("Something went wrong. Please try again later.");
        // });
    }



    return (
        <>

            <div className="Login">

                <form onSubmit={handleSubmit}>

                    <label>username</label>
                    <input
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit" disabled={!validateForm()}>
                        Login
           </button>

                    {/* <button onClick={checkSuccess}>
                        token Test
           </button> */}

                </form>

                <p id="message"></p>

            </div>
        </>
    );

}



export function checkSuccess(props) {
    // if (loginSuccess === true) {
    //     console.log(loginSuccess)
    //     return true;
    // }
    // else {
    //     console.log(loginSuccess)
    //     return false;
    // }
    // return console.log(authToken);
    return loginSuccess;
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

async function LoginConnect(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header


    });
    return response.json(); // parses JSON response into native JavaScript objects
}


function error(name) {
    // alert('Hello ' + name);
}

function onConnectionClosed() {
    // var name = prompt('Please enter your name.');
    // callback(name);
}

onConnectionClosed();

export default Login;


