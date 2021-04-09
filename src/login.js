import React, { useState } from 'react';

function Login() {
   
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
      return username.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
      event.preventDefault();
      LoginConnect('http://jats.web.eadania.dk/authentication/login', { username, password})
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    });
    }

    return (
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
       </div>
    );
   

    
  }

// Example POST method implementation:
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


