import React, { Component } from "react";
import "./forgotpassword.css";

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

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      isValid: true,
      isProvided: true,
      emailSent: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange = name => e => {
    this.setState({ [name]: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.setState({ isProvided: true });
    this.setState({ isValid: true });
    this.setState({ emailSent: null });
    const emailLowercase = this.state.email.toLowerCase();
    fetch("http://localhost:8080/resetPassword", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: emailLowercase
      })
    })
      .then(res => {
        const data = res.json();
        return data;
      })
      .then(data => {
        const message = data.message;
        switch (message) {
          case "No Email Provided":
            this.setState({ isProvided: false });
            break;
          case "Email Not Found":
            this.setState({ isValid: false });
            break;
          case "200":
            this.setState({ emailSent: true });
            break;
          default:
            this.setSate({ emailSent: false });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    function EmailInvalid(props) {
      return <div>User Email Not Found!</div>;
    }
    function EmailValid(props) {
      const isVerified = props.eValid;
      if (!isVerified) {
        return <EmailInvalid />;
      } else {
        return null;
      }
    }
    function EmailProvided(props) {
      return <div>Please provide an email address</div>;
    }
    function EmailIsProvided(props) {
      const isProvided = props.eProvided;

      if (!isProvided) {
        return <EmailProvided />;
      } else {
        return null;
      }
    }

    function EmailError(props) {
      return <div>An unknown error occured, please try again later. </div>;
    }

    function EmailSent(props) {
      const checkSent = props.eSent;
      if (checkSent) {
        //passing props to component login through react router so msg can show
        return <Redirect to={{ pathname: "/login", pwReset: true }} />;
      } else if (checkSent === false) {
        return <EmailError />;
      } else {
        return null;
      }
    }

    return (
      <div className="container">
        <Paper className="formHolder">
          <h1 className="forget-title">Forgetting something?</h1>
          <p className="pw-blurb">
            No problem. Just enter the email associated with your account below
            and we'll get you set up with a new password!
          </p>
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
            <EmailValid eValid={this.state.isValid} />
            <EmailIsProvided eProvided={this.state.isProvided} />
            <EmailSent eSent={this.state.emailSent} />
            <CustomButton type="submit" fullWidth={true} variant="contained">
              Submit
            </CustomButton>
          </form>
        </Paper>
      </div>
    );
  }
}
export default ForgotPassword;
