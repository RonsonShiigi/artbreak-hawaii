import React, { Component } from "react";

class Edit_Error extends Component {
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
        <h1>There was an error editing your artpiece</h1>
        <a href="http://localhost:8081/dashboard">Try Again</a>
      </div>
    );
  }
}

export default Edit_Error;
