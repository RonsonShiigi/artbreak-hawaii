import React, { Component } from "react";

class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.text);
    this.setState({ text: "" });
  }

  onChange(e) {
    this.setState({ text: e.target.value });
    if (this.props.onChange) {
      this.props.onChange();
    }
  }

  render() {
    const styles = {
      container: {
        paddingTop: 25,
        borderTop: "1px #4C758F solid",
        width: "78vw",
        marginTop: "auto"
      },
      form: {
        display: "flex",
        flexDirection: "column",
        width: "auto",
        height: "auto"
      },
      input: {
        width: "auto",
        color: "black",
        background: "none",
        outline: "none",
        border: "none",
        textShadow: "none",
        flex: 1,
        fontSize: 16,
        padding: 0,
        paddingLeft: 20
      },
      inputDiv: {
        display: "flex",
        flexDirection: "column",
        padding: 100,
        flex: 1
      }
    };
    return (
      <div className="inputDiv" style={styles.container}>
        <div>
          <form onSubmit={this.onSubmit} style={styles.form}>
            <input
              type="text"
              placeholder="Type a message here then hit ENTER"
              onChange={this.onChange}
              value={this.state.text}
              style={styles.input}
              autoFocus
            />
          </form>
        </div>
      </div>
    );
  }
}

export default SendMessageForm;
