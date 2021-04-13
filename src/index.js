import React from 'react';
import ReactDOM from 'react-dom';
import GameBrowser from './app';
import Login from './login';
import ReactComponent, { Component } from "react";
import "./styles.css";

import ChatWindow from "./ChatWindow";
import ChatComposer from "./ChatComposer";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        { text: "First stored message" },
        { text: "Second stored message" }
      ]
    };
  }

  // if new message was submitted from child component // process
  submitted = getNewMessage => {
    if (getNewMessage !== "") {
      // match the state format
      const newMessage = { text: getNewMessage };
      // merge new message in copy of state stored messages
      let updatedMessages = [...this.state.messages, newMessage];
      // update state
      this.setState({
        messages: updatedMessages
      });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>ReactJS Chat Box</h1>
        {/* send stored messages as props to chat window */}
        <ChatWindow messagesList={this.state.messages} />
        {/* send submitted props to chat composer */}
        <ChatComposer submitted={this.submitted} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

 
ReactDOM.render(<GameBrowser/>, document.getElementById('root'));
