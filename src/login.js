import React, { useState } from 'react';

function LoginTest(props) {
   
    const username = useFormInput('');
    const password = useFormInput('');
 
    // const handleLogin = () => {
    //   axios.post('http://jats.web.eadania.dk/authentication/login', { username: username.value, password: password.value })

    // }
    return (
      <div>
        Login<br /><br />
        <div>
          Username<br />
          <input type="text" {...username} autoComplete="new-password" />
        </div>
        <div style={{ marginTop: 10 }}>
          Password<br />
          <input type="password" {...password} autoComplete="new-password" />
        </div>

      </div>
    );
  }
  Login('http://jats.web.eadania.dk/authentication/login', { username: "MMJ", password: "Dreamteam" })
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    });
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

// Example POST method implementation:
async function Login(url = '', data = {}) {
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


