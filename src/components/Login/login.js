import React, { Component } from "react";
import axios from "axios";
import "./login.css";

import { withStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fireRedirect: false,
      verifyEmailPw: true,
      pwReset: null,
      resetSuccess: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.location.pwReset) {
      this.setState({ pwReset: true });
    }

    if (this.props.location.resetSuccess) {
      this.setState({ resetSuccess: true });
    }
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const emailLowercase = this.state.email.toLowerCase();

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password: this.state.password,
        email: emailLowercase
      })
    })
      .then(res => {
        if (res.status === 401) {
          this.setState({ verifyEmailPw: false });
          return;
        } else {
          let data = res.clone().json();

          localStorage.setItem("userEmail", this.state.email);
          localStorage.setItem("userId", data.id);
          localStorage.setItem("username", data.username);

          let userEmail = localStorage.getItem("userEmail");

          axios
            .get("http://localhost:8080/users")
            .then(res => {
              let users = res.data;
              users.filter(user => {
                if (user.email === userEmail) {
                  localStorage.setItem("username", user.username);
                  localStorage.setItem("userId", user.id);
                }
              });
            })
            .then(() => {
              window.location.replace("http://localhost:8081");
            })
            .catch(err => {
              console.log("Error", err);
            });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { verifyEmailPw, resetSuccess, pwReset } = this.state;

    function EmailPWError(props) {
      return <div>User Email or Password not found!</div>;
    }

    function EmailPWExists(props) {
      const isVerified = props.eExists;

      if (!isVerified) {
        return <EmailPWError />;
      } else {
        return null;
      }
    }

    function ResetPWMessage(props) {
      return (
        <div>
          A link has been sent the provided email address to reset your password
        </div>
      );
    }

    function ResetPassword(props) {
      const checkPwReset = props.resetPassword;

      if (checkPwReset) {
        return <ResetPWMessage />;
      } else {
        return null;
      }
    }

    function ResetSuccessMsg() {
      return <div>Password has been successfully changed</div>;
    }

    function ResetSuccess(props) {
      const resetSuccess = props.isSuccess;

      if (resetSuccess) {
        return <ResetSuccessMsg />;
      } else {
        return null;
      }
    }

    return (
      <div className="container">
        <Paper className="formHolder">
          <h1 className="form-title">Login</h1>
          <ResetPassword resetPassword={pwReset} />
          <ResetSuccess isSuccess={resetSuccess} />
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
            <EmailPWExists eExists={verifyEmailPw} />
            <br />

            <CustomButton type="submit" fullWidth={true} variant="contained">
              Submit
            </CustomButton>
            <br />
            <br />
            <Link to="/forgotPassword">Forgot Password</Link>
          </form>
        </Paper>
      </div>
    );
  }
}

export default Login;
