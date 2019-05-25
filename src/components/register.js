import React, { Component } from "react";
import axios from "axios";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      username: "",
      first_name: "",
      last_name: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(() => {
        console.log("User added to database!!");
      })
      .catch(err => {
        console.log("error", err);
      });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  };

  render() {
    const { email, password } = this.state;
    return (
      <form>
        <div>
          <label>
            Email:
            <input onChange={this.handleChange} type="text" name="email" />
          </label>
          <label>
            Password:
            <input onChange={this.handleChange} type="text" name="password" />
          </label>
          <label>
            Username:
            <input type="text" name="username" />
          </label>
          <label>
            First Name:
            <input type="text" name="first_name" />
          </label>
          <label>
            Last Name:
            <input type="text" name="last_name" />
          </label>
        </div>
      </form>
    );
  }
}

export default Register;
