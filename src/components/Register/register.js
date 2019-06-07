import React, { Component } from "react";
import "./Register.css";

import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

//custom-styled components
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
      backgroundColor: "#ffffff"
    }
  }
})(Button);

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      username: "",
      emailExist: false,
      usernameExist: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log("userExist State", this.state.emailExist);
    console.log("userExist State", this.state.usernameExist);
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ emailExist: false });
    this.setState({ usernameExist: false });
    fetch("http://localhost:8080/api/auth/register/check", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username
      })
    })
      .then(res => {
        return res.json();
      })
      .then(user => {
        console.log("USER", user);
        if (user.email === "" && user.username === "") {
          fetch("http://localhost:8080/api/auth/register", {
            method: "POST",
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
            .then(res => {
              console.log("RES", res);
              console.log("User added to database");
            })
            .catch(err => {
              console.log("FRONT END", err);
            });
        } else {
          console.log("USERRR", user);
          if (user.email !== "" && user.username !== "") {
            this.setState({ emailExist: true });
            this.setState({ usernameExist: true });
            console.log(this.state.emailExist);
            console.log(this.state.usernameExist);
          } else if (user.email !== "") {
            this.setState({ emailExist: true });
            console.log(this.state.emailExist);
          } else if (user.username !== "") {
            this.setState({ usernameExist: true });
            console.log(this.state.usernameExist);
          } else {
            return;
          }
        }
      });
  };
  render() {
    function UsernameError(props) {
      return <div>Username Taken, Please use another username..</div>;
    }

    function EmailError(props) {
      return <div>Email already in use, Please enter another email..</div>;
    }

    function EmailExists(props) {
      const emailExists = props.emailExists;
      console.log("EMAIL EXISTS", emailExists);
      if (emailExists) {
        return <EmailError />;
      } else {
        return null;
      }
    }

    function UsernameExists(props) {
      const usernameExists = props.userExists;
      console.log("EMAIL EXISTS", usernameExists);
      if (usernameExists) {
        return <UsernameError />;
      } else {
        return null;
      }
    }

    return (
      <div className="container">
        <Paper className="formHolder">
          <h1 className="form-title">Register</h1>
          <form onSubmit={this.handleSubmit}>
            <CssText
              id="email"
              label="email"
              key="email"
              name="email"
              // value={values.email}
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
            />
            <EmailExists emailExists={this.state.emailExist} />
            <CssText
              id="username"
              label="username"
              key="username"
              name="username"
              // value={values.username}
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
            />
            <UsernameExists userExists={this.state.usernameExist} />
            <div />
            <CssText
              id="password"
              label="password"
              key="password"
              name="password"
              // value={values.password}
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
            />
            <CssText
              id="first_name"
              label="first name"
              key="first_name"
              name="first_name"
              // value={values.first_name}
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
            />
            <CssText
              id="last_name"
              label="last name"
              key="last_name"
              name="last_name"
              // value={values.last_name}
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
            />
            <CustomButton type="submit" variant="contained" fullWidth={true}>
              Submit
            </CustomButton>
          </form>
        </Paper>
      </div>
    );
  }
}

export default Register;
