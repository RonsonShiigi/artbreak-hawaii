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
      emailValid: true,
      usernameExist: false,
      passwordValid: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  handlePWChange = e => {
    this.setState({ passwordValid: true });
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
    if (e.target.value.length < 8 || e.target.value.length > 16) {
      this.setState({ passwordValid: false });
    }
  };

  //may need to refactor using switch statements?
  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      emailExist: false,
      usernameExist: false,
      emailValid: true,
      passwordValid: true
    });
    const emailLowercase = this.state.email.toLowerCase();
    console.log("TOLOWERCASE", emailLowercase);

    fetch("http://localhost:8080/api/auth/register/check", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailLowercase,
        username: this.state.username
      })
    })
      .then(res => {
        return res.json();
      })
      .then(user => {
        if (user.email === "ERROR" && user.username !== "") {
          this.setState({ usernameExist: true, emailValid: false });
        } else if (user.email === "ERROR") {
          this.setState({ emailValid: false });
        } else if (user.email === "" && user.username === "") {
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
              email: emailLowercase
            })
          })
            .then(res => {
              window.location.replace("http://localhost:8081/login");
            })
            .catch(err => {
              console.log("FRONT END", err);
            });
        } else {
          if (user.email !== "" && user.username !== "") {
            this.setState({ emailExist: true });
            this.setState({ usernameExist: true });
          } else if (user.email !== "") {
            this.setState({ emailExist: true });
          } else if (user.username !== "") {
            this.setState({ usernameExist: true });
          }
        }
      });
  };
  render() {
    const { passwordValid } = this.state;
    function UsernameError(props) {
      return <div>Username Taken, Please use another username..</div>;
    }

    function EmailError(props) {
      return <div>Email already in use, Please enter another email..</div>;
    }

    function EmailInvalid(props) {
      return <div>Please provide a valid email address</div>;
    }
    function PasswordError(props) {
      return <div>Password must be between 8-16 characters</div>;
    }

    function EmailExists(props) {
      const emailExists = props.emailExists;

      if (emailExists) {
        return <EmailError />;
      } else {
        return null;
      }
    }

    function UsernameExists(props) {
      const usernameExists = props.userExists;

      if (usernameExists) {
        return <UsernameError />;
      } else {
        return null;
      }
    }

    function EmailValid(props) {
      const isValid = props.emailInvalid;
      if (!isValid) {
        return <EmailInvalid />;
      } else {
        return null;
      }
    }
    function PasswordValid(props) {
      const isValid = props.passwordInvalid;
      if (!isValid) {
        return <PasswordError />;
      } else {
        return null;
      }
    }

    function submitDisabled() {
      if (passwordValid) {
        return false;
      } else {
        return true;
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
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
              required={true}
            />
            <EmailExists emailExists={this.state.emailExist} />
            <EmailValid emailInvalid={this.state.emailValid} />
            <CssText
              id="username"
              label="username"
              key="username"
              name="username"
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
              required={true}
            />
            <UsernameExists userExists={this.state.usernameExist} />
            <div />
            <CssText
              id="password"
              label="password"
              key="password"
              name="password"
              onChange={this.handlePWChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
              type="password"
            />
            <PasswordValid passwordInvalid={this.state.passwordValid} />
            <CssText
              id="first_name"
              label="first name"
              key="first_name"
              name="first_name"
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
              onChange={this.handleChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
            />
            <CustomButton
              disabled={submitDisabled()}
              type="submit"
              variant="contained"
              fullWidth={true}
            >
              Submit
            </CustomButton>
          </form>
        </Paper>
      </div>
    );
  }
}

export default Register;
