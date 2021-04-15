// import React from "react";
import Login from './login';
import * as utils from './login';
import useGameServer from "./useGameServer";
import Map from "./map";
import React, { useState } from 'react';
import { sendMessage } from '@microsoft/signalr/dist/esm/Utils';



let gameHubUrl = "http://jats.web.eadania.dk/gamehub"

class LoggedIn extends React.Component {
  constructor() {
    super();
    this.state = { selection: "" };
    this.onLoggedin = this.onLoggedin.bind(this);
    this.onDrawGround = this.drawMap.bind(this);
  };

  onLoggedin(token) {
    this.setState({ selection: token})
  }
    drawMap(ground, clutter, moveables, effects) {
    this.setState({selection: ground})
    this.setState({selection: clutter})
    this.setState({selection: moveables})
    this.setState({selection: effects})


}
  render() {
    return (
      this.state.selection !== "" ?

        <GameWindow
          token={this.state.selection}
          ground={this.state.selection}
          clutter={this.state.selection}
          moveables={this.state.selection}
          effects={this.state.selection}

        /> :
        <Login
        onLogin={this.onLoggedin}

        />
    );
  }
}

// function drawMap(ground, clutter, moveables, effects) {
//     this.setState({selection: ground})
//     this.setState({selection: clutter})
//     this.setState({selection: moveables})
//     this.setState({selection: effects})
//     drawGround=(this.)
// }


function error(name) {
  // alert('Hello ' + name);
}

function onConnectionClosed() {
  // var name = prompt('Please enter your name.');
  // callback(name);
}

onConnectionClosed();


function GameWindow(props, event) {
  const gameServer = useGameServer(gameHubUrl, props.token, onConnectionClosed);
  const [chatMessage, setChatMessage] = useState("");
  gameServer.connect();
  gameServer.onEvent("WorldUpdate", response  => {
    console.log(response);
    //console.log(response.ground);
    props.onDrawGround(response.ground);
    props.onDrawGround(response.clutter);
    props.onDrawGround(response.moveables);
    props.onDrawGround(response.effects);

  });
  gameServer.onEvent("ChatMessage", response  => {
    console.log(response);
  });
  gameServer.onEvent("Combat log", response => {
    console.log(response);
  });

  Attack(event)
  {
    if(event.key === 'x')
    {
      alert ("123")
      gameServer.invoke("Attack")
    }
  }

  SendMessage(event)
  {
    // if(event.key === 'y')
    // {
      gameServer.invoke("Chat", chatMessage)
    // }
    // else if (event.key !== 'y')
    // {
    //   //gameServer.invoke("Chat", chatMessage)
    // }

  }

  return (
    <div>
    <label>Message</label>
    <input
        autoFocus
        value={chatMessage}
        onChange={(e) => setChatMessage(e.target.value)}
        //onKeyPress={SendMessage}
        
        />
    <>
    <button type="submit" value={chatMessage} onClick={SendMessage}>
      
                        Send
           </button>
      <p>

      </p>
    </>
    <div className="grid-container">
      <img alt="" className="grid-item ground" src="./tiles/tile_01" />

    </div>
        </div>

  );
}

function SendMessage(event) {
  
}
function Attack(event) {
  
}


export default LoggedIn;

