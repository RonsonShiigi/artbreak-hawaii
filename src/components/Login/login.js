import React, { Component } from "react";
import axios from "axios";
import "./login.css";

import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// custom-styled components
const CssText = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#D88A8A"
    },
    "& .MuiInput-underline: after": {
      borderBottomColor: "#D88A8A"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#D88A8A"
      },
      "&:hover fieldset": {
        borderColor: "#D88A8A"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#D88A8A"
      }
    }
  }
})(TextField);

const CustomButton = withStyles({
  root: {
    backgroundColor: "#D88A8A",
    "&:hover": {
      backgroundColor: "#D88A8A"
    }
  }
})(Button);

// export default function Login(props) {
//   const [values, setValues] = React.useState({
//     email: "",
//     password: ""
//   });

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // first_name: this.state.first_name,
        // last_name: this.state.last_name,
        password: this.state.password,
        // username: this.state.username,
        email: this.state.email
      })
    })
      .then(res => {
        return res.clone().json();
      })
      .then(data => {
        console.log("DATA", data);
        localStorage.setItem("userEmail", this.state.email);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("username", data.username);
      })
      .then(data => {
        console.log("DATA2", data);
        let userEmail = localStorage.getItem("userEmail");
        axios.get("http://localhost:8080/users").then(res => {
          let users = res.data;
          users.filter(user => {
            if (user.email === userEmail) {
              localStorage.setItem("username", user.username);
              localStorage.setItem("userId", user.id);
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
        <Paper className="formHolder">
          <h1 className="form-title">Login</h1>
          <form onSubmit={this.handleSubmit}>
            <CssText
              id="email"
              label="email"
              key="email"
              name="email"
              onChange={this.handleChange("email")}
              margin="normal"
              fullWidth={true}
              variant="outlined"
            />
            <br />
            <CssText
              id="password"
              label="password"
              type="password"
              key="password"
              name="password"
              onChange={this.handleChange("password")}
              margin="normal"
              variant="outlined"
              fullWidth={true}
            />
            <br />
            <CustomButton type="submit" fullWidth={true} variant="filled">
              Submit
            </CustomButton>
          </form>
        </Paper>
      </div>
    );
  }
}

export default Login;
