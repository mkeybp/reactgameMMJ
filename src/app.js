import React from "react";
import Login from './login';
import * as utils from './login';
import useGameServer from "./useGameServer";
/// CLAllback til login med props
let gameHubUrl = "http://jats.web.eadania.dk/gamehub"

class LoggedIn extends React.Component {
  constructor() {
    super();
    this.state = { selection: "" };
    this.onClose = this.onLogin.bind(this);
    this.onLoggedin = this.onLoggedin.bind(this);
  };

  onLogin() {
    //   // if logged in (token === HAS VALUE)
    //    this.state.selection === "" 
    // if(data.success === true)
    // if(Login(tokenId === true))

    // if (utils.checkSuccess() === true) {
    //   this.setState({ selection: "1" });
    // }
    // else{
    // this.setState({ selection: "" });
    // }
  }

  onLoggedin(token) {
    this.setState({ selection: token})
  }

  render() {
    return (
      // this.state.selection === utils.checkSuccess() ?
      this.state.selection !== "" ?

        <GameWindow
          onClose={this.onClose}
          token={this.state.selection}
        /> :
        <Login
        onLogin={this.onLoggedin}

        />
    );
  }
}


function onConnectionClosed(probs) {
  
}

function GameWindow(props) {
  // console.log(authToken);
  // console.log(utils.checkSuccess());
  const gameServer = useGameServer(gameHubUrl, props.token, onConnectionClosed);
  gameServer.connect();
  return (
    <>
      <button onClick={props.onClose}>X</button>
      
      <p>

      </p>
    </>
  );
}




export default LoggedIn;

