import React from "react";
import Login from './login';
import * as utils from './login';
import useGameServer from "./useGameServer";
import Map from "./map";

let gameHubUrl = "http://jats.web.eadania.dk/gamehub"

class LoggedIn extends React.Component {
  constructor() {
    super();
    this.state = { selection: "" };
    this.onLoggedin = this.onLoggedin.bind(this);
  };

  onLoggedin(token) {
    this.setState({ selection: token})
  }

  render() {
    return (
      this.state.selection !== "" ?

        <GameWindow
          token={this.state.selection}
        /> :
        <Login
        onLogin={this.onLoggedin}

        />
    );
  }
}
function error(name) {
  // alert('Hello ' + name);
}

function onConnectionClosed() {
  // var name = prompt('Please enter your name.');
  // callback(name);
}

onConnectionClosed();

function GameWindow(props) {
  const gameServer = useGameServer(gameHubUrl, props.token, onConnectionClosed);

  gameServer.connect();
  gameServer.onEvent("WorldUpdate", response  => {
    
  });
  gameServer.invoke("Chat", String => {
    String = "123";
  })
  gameServer.onEvent("ChatMessage", response  => {
    console.log(response);
  });
  return (

    <>
      <button onClick={props.onClose}>X</button>

      <p>

      </p>
    </>
  );
}



export default LoggedIn;

