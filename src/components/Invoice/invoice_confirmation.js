import React, { Component } from "react";

import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Invoice_Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: ""
    };
  }
  componentDidMount() {
    this.setState({ user_id: localStorage.getItem("userId") });
  }

  render() {
    return (
      <div className="container">
        <h1>You Have Succesfully Sent Your Invoice</h1>
        <a href={`http://localhost:8081/dashboard`}>Return To Dashboard</a>
      </div>
    );
  }
}

export default Invoice_Confirmation;
