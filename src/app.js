import Login from './login';
import * as utils from './login';
import useGameServer from "./useGameServer";
import React, { useEffect, useState } from 'react';
import { sendMessage } from '@microsoft/signalr/dist/esm/Utils';
import "./game.css"



let gameHubUrl = "http://jats.web.eadania.dk/gamehub"

class LoggedIn extends React.Component {
  constructor() {
    super();
    this.state = { selection: "" };
    this.onLoggedin = this.onLoggedin.bind(this);
    this.onDrawInfo = this.drawMap.bind(this);
    this.onDrawGround = this.drawMap.bind(this);
    this.onDrawClutter = this.drawMap.bind(this);
    this.onDrawMoveables = this.drawMap.bind(this);
    this.onDrawEffects = this.drawMap.bind(this);

  };

  onLoggedin(token) {
    this.setState({ selection: token })
  }
  drawMap(ground, clutter, moveables, effects) {
    this.setState({ selection: ground })
    this.setState({ selection: clutter })
    this.setState({ selection: moveables })
    this.setState({ selection: effects })


  }

  //  If disconnect (logout/error) then go to login page


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


let numbers = [1, 2, 3];




function GameWindow(props, event) {
  const gameServer = useGameServer(gameHubUrl, props.token, onConnectionClosed);
  const [chatMessage, setChatMessage] = useState("");
  const [ground, setGround] = useState([]);
  const [info, setInfo] = useState("");
  const [clutter, setClutter] = useState({id: "" , tile: "", flipped: "", xpos: "", ypos: ""});
  const [moveables, setMoveables] = useState("");
  const [effects, setEffects] = useState("");
  // gameServer.connect();




  function ImageComponent(props) {
    return <>{
      <p>Number: <i>{props.number}</i></p>
    }</>
  }

  function Component(props) {
    return <>{
      // ground.map(n => <ImageComponent number={n} />)
      // numbers.map(n => <p>{n}</p> )


      // <img alt="" className="grid-item ground" src="./tiles/tile_01.png" />

      // ground.map(n => <img className="grid-item ground"  src="./tiles/tile_{n}" /> )
      ground.map(n => <img 
        alt="" 
        className="grid-item ground" 
        src={"./tiles/tile_" + n + ".png"} />)

      clutter.map(s => <img 
        alt="" 
        style={{left: clutter.xpos , top: clutter.ypos}}
        
        className="grid-item clutter"
        src={"./tiles/tile_" + s + ".png"} />)
    </>
    
  }
  function connectToServer(props) {
    gameServer.connect();
    gameServer.onEvent("WorldUpdate", response => {
      console.log(response);
      if (response.ground !== undefined) {
        setGround(response.ground);
        ground.map(n => <img src={n} />)
      }
      if (response.clutter !== undefined) {
        setClutter(response.clutter);
        clutter.map(s => <img style={} src={s} />)
      }



      // if (response.ground !== undefined) {
      //   setGround(response.ground);
      //   ground.map(n => <img src={n} />)
      // }
      // if (response.ground !== undefined) {
      //   setGround(response.ground);
      //   ground.map(n => <img src={n} />)
      // }

    });
    gameServer.onEvent("ChatMessage", response => {
      document.getElementById("message").innerHTML = response;
      console.log(response);
    });
    gameServer.onEvent("CombatMessage", response => {
      console.log(response);
    });

  }




  useEffect(connectToServer, [])



  Attack(event)
  {
    document.addEventListener('keydown', function (event) {
      if (event.code == 'Space') {
        gameServer.invoke("Attack")
        gameServer.onEvent("WorldUpdate", response => {
          console.log(response)
        })
      }
    });
  }
  // w-y
  //s+y
  //d+x
  // a-x
  Move(event)
  {
    // let pushed = "";
    // document.addEventListener('keydown', function (event) {
    //   if (event.code == 'KeyW') {
    //     pushed = "up"
    //   }
    //   else if (event.code == 'KeyS') {
    //     pushed = "down"
    //   }
    //   else if (event.code == 'KeyA') {
    //     pushed = "left"
    //   }
    //   else if (event.code == 'KeyD') {
    //     pushed = "right"
    //   }
    //   else if (event.code == 'Space') {
    //     gameServer.invoke("Attack")

    //   }
    //   gameServer.invoke("MoveDirection", pushed)

    //   gameServer.onEvent("WorldUpdate", response => {
    //     console.log(response)
    //     document.getElementById("biome").innerHTML = response.info.biome;
    //     document.getElementById("xpos").innerHTML = response.info.xpos;
    //     document.getElementById("ypos").innerHTML = response.info.ypos;
    //   }
    //   )
    // })



    document.addEventListener('keydown', function (event) {
      if (event.code == 'KeyW') {
        gameServer.invoke("MoveDirection", "up")
        gameServer.onEvent("WorldUpdate", response => {
          console.log(response)
          document.getElementById("biome").innerHTML = response.info.biome;
          document.getElementById("xpos").innerHTML = response.info.xpos;
          document.getElementById("ypos").innerHTML = response.info.ypos;
        }
        )
      }

      else if (event.code == 'KeyS') {
        gameServer.invoke("MoveDirection", "down")
        gameServer.onEvent("WorldUpdate", response => {
          console.log(response)
          document.getElementById("biome").innerHTML = response.info.biome;
          document.getElementById("xpos").innerHTML = response.info.xpos;
          document.getElementById("ypos").innerHTML = response.info.ypos;
        })
      }

      else if (event.code == 'KeyA') {
        gameServer.invoke("MoveDirection", "left")
        gameServer.onEvent("WorldUpdate", response => {
          console.log(response)
          document.getElementById("biome").innerHTML = response.info.biome;
          document.getElementById("xpos").innerHTML = response.info.xpos;
          document.getElementById("ypos").innerHTML = response.info.ypos;
        })
      }

      else if (event.code == 'KeyD') {
        gameServer.invoke("MoveDirection", "right")
        gameServer.onEvent("WorldUpdate", response => {
          console.log(response)
          document.getElementById("biome").innerHTML = response.info.biome;
          document.getElementById("xpos").innerHTML = response.info.xpos;
          document.getElementById("ypos").innerHTML = response.info.ypos;
        })
      }
    }

    );
  }
  SendMessage(event)
  {

    // document.getElementById("myBtn").addEventListener("click", function() {
    //   gameServer.invoke("Chat", chatMessage)
    // });

    document.addEventListener('keydown', function (event) {
      if (event.code == 'Enter') {
        gameServer.invoke("Chat", chatMessage)
        // setChatMessage=chatMessage("");
      }
    })

  };



  const playerInfo = {
    position: "fixed",
    bottom: "0",
    backgroundColor: "Darkgray",
    padding: "10px",
  }

  const container = {
    position: "fixed",
    bottom: "0",
    right: "0",
    border: "2px solid #dedede",
    backgroundColor: "#f1f1f1",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px 0",
    width: "350px",
    wordWrap: "break-word",
  }
  const darker = {
    borderColor: "#ccc",
    backgroundColor: "#ddd"
  }

  return (
    <>
      {/* LOGOUT BUTTON  */}
      <button type="submit" onClick={gameServer.disconnect}>Log out</button>

      {/* THE GAME WINDOW*/}
      <div className="game__window">


        {/* {images.map(({ id, tile, flipped, xpos, ypos }) => <img key={id} src={tile} title={flipped} alt={xpos} />)} */}


      </div>

      {/* THE CHAT WINDOW*/}
      <div className="chat__window">
        <div
          // Gets an error on the wordWrap (word-wrap) css property
          // @ts-ignore
          style={{ ...container }}>

          <p id="message"></p>
          <label>Message</label>
          <textarea
            autoFocus
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          //onKeyPress={SendMessage}
          />
          <button type="submit" id="myBtn" value={chatMessage} onClick={gameServer.invoke}>Send</button>

        </div>

        <>
          {/* PLAYERINFO */}
          <div
            // @ts-ignore
            style={{ ...playerInfo }}>
            <p>BIOME: <span style={{ margin: "10px" }} id="biome"></span></p>
            <p>POSITION X: <span style={{ margin: "10px" }} id="xpos"></span></p>
            <p>POSITION Y: <span style={{ margin: "10px" }} id="ypos"></span></p>
          </div>
        </>

        <div className="grid-container">
        <Component />

          {/* <img alt="" className="grid-item ground" src="./tiles/tile_01.png" /> */}
          {/* <img alt="" className="grid-item ground" src="./tiles/tile_01.png" />
          <img alt="" className="grid-item ground" src="./tiles/tile_01.png" />
          <img alt="" className="grid-item ground" src="./tiles/tile_01.png" /> */}

        </div>
      </div>
    </>
  );
}


function SendMessage(event) {

}
function Attack(event) {

}

function Move(params) {

}

export default LoggedIn;

