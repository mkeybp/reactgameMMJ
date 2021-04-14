import React from "react";
import Login from './login';
import * as utils from './login';
/// CLAllback til login med props


class LoggedIn extends React.Component {
  constructor() {
    super();
    this.state = { selection: "" };
    this.onClose = this.onLogin.bind(this);
  };

  onLogin() {
    //   // if logged in (token === HAS VALUE)
    //    this.state.selection === "" 
    // if(data.success === true)
    // if(Login(tokenId === true))

    if (utils.checkSuccess() === true) {
      this.setState({ selection: "1" });
    }
    else{
    this.setState({ selection: "" });
    }
  }

  render() {
    return (
      // this.state.selection === utils.checkSuccess() ?
      this.state.selection === "1" ?

        <GameWindow
          onClose={this.onClose}
        /> :
        <Login


        />
    );
  }
}



function GameWindow(props) {
  // console.log(authToken);
  // console.log(utils.checkSuccess());
  return (

    <>
      <button onClick={props.onClose}>X</button>

      <p>

      </p>
    </>
  );
}




export default LoggedIn;

