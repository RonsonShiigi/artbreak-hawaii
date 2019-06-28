import React, { Component } from "react";

class NewProduct_Error extends Component {
  constructor() {
    super();
    this.state = {
      user_id: ""
    };
  }
  componentDidMount() {
    this.setState({ user_id: localStorage.getItem("userId") });
    // this.state.user_id = localStorage.getItem("userId");
  }

  render() {
    return (
      <div className="container">
        <h1>There was an error adding a new artpiece</h1>
        <a href="http://35.167.36.255:8081/upload">Try Again</a>
      </div>
    );
  }
}

export default NewProduct_Error;
