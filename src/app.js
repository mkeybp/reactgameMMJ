import React, { useState } from 'react';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';


// import Dashboard from '../Dashboard/Dashboard';
import Login from './login';

function App() {
    const [token, setToken] = useState();
  
    // if(!token) {
    //   return <Login setToken={setToken} />
    // }
  
    return (
      <div className="wrapper">
        <h1>Application</h1>
       
      </div>
    );
  }
  
  export default App;

