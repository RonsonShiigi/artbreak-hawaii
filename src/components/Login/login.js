import React, { Component } from "react";
import axios from "axios";
import "./login.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      first_name: "",
      password: "",
      username: ""
    };
  }
  // const [values, setValues] = React.useState({
  //   email: "",
  //   password: ""
  // });

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("state", this.state);
    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        password: this.state.password,
        username: this.state.username,
        email: this.state.email
      })
    })
      .then(() => {
        console.log("User Logged In...");
      })
      .then(data => {
        localStorage.setItem("userEmail", this.state.email);
      })
      .then(data => {
        let userEmail = localStorage.getItem("userEmail");
        console.log("user", userEmail);
        axios.get("http://localhost:8080/users").then(res => {
          let users = res.data;
          users.filter(user => {
            if (user.email === userEmail) {
              localStorage.setItem("username", user.username);
              localStorage.setItem("userId", user.id);
              console.log("username", localStorage.getItem("username"));
              console.log("userId", localStorage.getItem("userId"));
            }
          });
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="loginHolder">
          <form onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              label="email"
              key="email"
              name="email"
              onChange={this.handleChange("email")}
              margin="normal"
              variant="outlined"
              fullWidth="true"
            />
            <br />
            <TextField
              id="password"
              label="password"
              type="password"
              key="password"
              // value={values.password}
              name="password"
              onChange={this.handleChange("password")}
              margin="normal"
              variant="outlined"
              fullWidth="true"
            />
            <br />
            <Button
              type="submit"
              fullWidth="true"
              color="secondary"
              variant="contained"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
