import React from "react";
import Login from './login';
import authToken from "./login";
import useGameServer from "./useGameServer";
import onConnectionClosed from "./useGameServer"
/// CLAllback til login med props

let gameHubUrl = "/gamehub";

class LoggedIn extends React.Component {
  constructor() {
    super();
    this.state = { selection: "" };
    this.onClose = this.onLogin.bind(this);
  }


  onLogin() {
    //   // if logged in (token === HAS VALU
    //    this.state.selection === "" 

    // if(data.success === true)
    // if(Login(tokenId === true))
    this.setState({ selection: "1" });
    <Login
     
    />
  }

  render() {
    console.log(sessionStorage.key);
    return (
      this.state.selection === "" ?

        <GameWindow
          onClose={this.onClose}
        /> :
        <Login


        />
    );
  }
}


function GameWindow(props) {
  return (
    <>
      <button onClick={props.onClose}>X</button>
      <h1>Welcome!!</h1>
    </>
  );
}




export default LoggedIn;

