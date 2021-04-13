import React, { Component } from "react";
export default class ChatComposer extends Component {
    state = {
      new: ""
    };
  
    // hvis formularen er afgivet, skal parent-component informeres
    handleSubmit = event => {
      event.preventDefault();
      // send event værdi til parent-component vha. kalde props
      this.props.submitted(this.state.new);
      // remove single message stored in this component state
      // and empty input coz form was submitted
      this.setState({
        new: ""
      });
    };
    handleCompose = event => {
        let typedValue = event.target.value;
        if (typedValue !== "" && typedValue !== " ") {
          // store new single message temporarily
          this.setState({
            new: event.target.value
          });
        }
      };
    
      render() {
        return (
          // dont use event => handle event below
          // binding won't work here
          <div className="chat-composer">
            <form onSubmit={this.handleSubmit}>
              <input
                className="form-control"
                placeholder="Type & hit enter"
                onChange={this.handleCompose}
                value={this.state.new}
              />
            </form>
          </div>
        );
      }
    }