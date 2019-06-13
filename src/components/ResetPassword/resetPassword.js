import React, { Component } from "react";
import "./resetPassword.css";

import { Redirect } from "react-router";
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

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      passwordValid: true,
      tokenExpired: false,
      uriToken: null,
      resetSuccess: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePWChange = this.handlePWChange.bind(this);
  }

  componentDidMount() {
    const tokenUrl = new URLSearchParams(document.location.search.substring(1));
    const token = tokenUrl.get("tkn");
    if (token) {
      this.setState({ uriToken: token });
    }
  }

  handlePWChange = e => {
    this.setState({ passwordValid: true });
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
    if (e.target.value.length < 8 || e.target.value.length > 16) {
      this.setState({ passwordValid: false });
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    const { uriToken, password } = this.state;
    fetch("http://localhost:8080/resetPassword/update", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ pw: password, token: uriToken })
    })
      .then(res => {
        const data = res.json();
        return data;
      })
      .then(data => {
        const message = data.message;
        switch (message) {
          case "401":
            this.setState({ tokenExpired: true });
            break;
          case "200":
            this.setState({ resetSuccess: true });
            break;
          default:
            this.setState({ resetSuccess: false });
        }
      });
  };

  render() {
    const { passwordValid, tokenExpired, resetSuccess } = this.state;
    function PasswordInvalid(props) {
      return <div>Please enter a password between 8-16 characters</div>;
    }
    function PasswordValid(props) {
      const isValid = props.pwValid;
      if (!isValid) {
        return <PasswordInvalid />;
      } else {
        return null;
      }
    }
    function TokenExpiredMsg(props) {
      return (
        <div>
          Password Reset Link is invalid or has expired, Please enter your email
          for a new link
        </div>
      );
    }
    function TokenExpired(props) {
      const isExpired = props.token;

      if (isExpired) {
        return <TokenExpiredMsg />;
      } else {
        return null;
      }
    }

    function ResetUnsuccess(props) {
      return <div>An unknown error occured, please try again later. </div>;
    }

    function submitDisabled() {
      if (passwordValid) {
        return false;
      } else {
        return true;
      }
    }

    function ResetSuccess(props) {
      const resetIsSuccess = props.isSuccess;
      if (resetIsSuccess) {
        return <Redirect to={{ pathname: "/login", resetSuccess: true }} />;
      } else if (resetIsSuccess === false) {
        return <ResetUnsuccess />;
      } else {
        return null;
      }
    }

    return (
      <div className="container">
        <Paper className="formHolder">
          <h1 className="form-title">Reset Password</h1>
          <TokenExpired token={tokenExpired} />
          <form onSubmit={this.handleSubmit}>
            <CssText
              id="password"
              label="password"
              key="password"
              name="password"
              onChange={this.handlePWChange}
              margin="normal"
              fullWidth={true}
              variant="outlined"
            />
            <br />
            <PasswordValid pwValid={passwordValid} />
            <ResetSuccess isSuccess={resetSuccess} />
            <CustomButton
              disabled={submitDisabled()}
              type="submit"
              fullWidth={true}
              variant="contained"
            >
              Submit
            </CustomButton>
          </form>
        </Paper>
      </div>
    );
  }
}
export default ResetPassword;
