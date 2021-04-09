import React from "react";
import Login from './login';


class GameBrowser extends React.Component {
  constructor() {
    super();
    let lobbyData = "1";
    this.state = { lobbyData: lobbyData, selection: "" };
    
    this.onClose = this.onClose.bind(this);
  }

  LoggedIn(props){
  // if logged in (success === true)
  //do this..

  }

  onClose() {
 
    this.setState({ selection: "1" });
  }

  render() {
    return (
      this.state.selection === "" ?
       
          <GameDetails
          onClose={this.onClose}
        /> :


        <Login
    
      
        />
    );
  }
}



function GameDetails(props) {
  let serverInfo = "1";

  return (
    <>
      <button onClick={props.onClose}>Close</button>
      <h4>Server info:</h4>
      <table>
        <tbody>
          <tr>
            <td>Server id:</td>
            <td>k</td>
          </tr>
          <tr>
            <td>Server name:</td>
            <td>"karsten"</td>
          </tr>
          <tr>
            <td>Game type:</td>
            <td>dm</td>
          </tr>
          <tr>
            <td>Game version:</td>
            <td>1.2</td>
          </tr>
          <tr>
            <td>Server type:</td>
            <td>surf</td>
          </tr>
          <tr>
            <td>Location:</td>
            <td>dk</td>
          </tr>
          <tr>
            <td>Latency:</td>
            <td>99</td>
          </tr>
        </tbody>
      </table>
      <h4>Players ({1}/{2})</h4>
      <p>3</p>
    </>
  );
}




export default GameBrowser;

