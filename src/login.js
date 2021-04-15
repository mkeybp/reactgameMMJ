// import { ConsoleLogger } from '@microsoft/signalr/dist/esm/Utils';
import React, { useState } from 'react';
import useGameServer from './useGameServer';

// props her
function Login(props) {

    // for testing
    const [username, setUsername] = useState("MMJ");
    const [password, setPassword] = useState("Dreamteam");



    function validateForm() {
        return username.length > 0 && password.length > 0;
    }


    function handleSubmit(event) {
        // setError(null);
        event.preventDefault();
        LoginConnect('http://jats.web.eadania.dk/authentication/login', { username, password })
            .then(data => {
                if (data.success) {
                    props.onLogin(data.data);
                    // setToken(tokenId)
                 
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



    return (
        <>

            <div className="Login">

                <form onSubmit={handleSubmit}>

                    <label>Username</label>
                    <input
                        autoFocus
                        style={{margin:"10px"}}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label>Password</label>
                    <input
                        type="password"
                        style={{margin:"10px"}}
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


