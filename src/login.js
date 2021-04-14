import { HttpResponse } from '@microsoft/signalr';
import React, { useCallback, useState } from 'react';
import { default as onConnectionClosed, default as useGameServer } from "./useGameServer";
import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";

let authToken;
let gameHubUrl = "http://jats.web.eadania.dk/gamehub";
//const authToken = {authToken}
//export defualt authToken


// props her
function Login(props) {
    const gameServer = useGameServer(gameHubUrl, authToken, onConnectionClosed);
    let message = document.getElementById("message");
    let errormessage = document.getElementById("errormessage");

    // for testing
    //const [authToken, setAuthToken] = useState("");
    const [username, setUsername] = useState("MMJ");
    const [password, setPassword] = useState("Dreamteam");
    const [error, setError] = useState(null);

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }


    function handleSubmit(event) {
        setError(null);
        event.preventDefault();
        LoginConnect('http://jats.web.eadania.dk/authentication/login', { username, password})
            .then(data => {
                authToken = data.token;
                if (data.success) {
                    gameServer.connect();
                    console.log(authToken);
                    // message.innerHTML = "<i style='color:green'>YOU ARE NOW LOGGED IN</i>";
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
    function testToken(authToken) {
        console.log(authToken)
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
                </form>

                <p id="message"></p>

            </div>
        </>
    );

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




export default Login;


