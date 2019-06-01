import React, { Component } from "react";
import "./login.css";

import { withStyles, makeStyles, createMuiTheme } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// custom-styled components
const CssText = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "#660d0d"
    },
    "& .MuiInput-underline: after": {
      borderBottomColor: "#660d0d"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#660d0d"
      },
      "&:hover fieldset": {
        borderColor: "#660d0d"
      },
      "&.Mui-focused fieldset": {
        borderColor: "#660d0d"
      }
    }
  }
})(TextField);

const CustomButton = withStyles({
  root: {
    backgroundColor: "#660d0d"
  }
})(Button);

const styles = theme => ({
  input: {
    border: "1px solid #eee",
    borderRadius: 0
  }
});

function Login(props) {
  const [values, setValues] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log("state", values);
    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        first_name: values.first_name,
        last_name: values.last_name,
        password: values.password,
        username: values.username,
        email: values.email
      })
    })
      .then(() => {
        console.log("User Logged In...");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Paper className="formHolder">
        <h1 className="title">Login</h1>
        <form onSubmit={handleSubmit}>
          <CssText
            id="email"
            label="email"
            key="email"
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            variant="outlined"
            fullWidth={true}
          />
          <br />
          <CssText
            id="password"
            label="password"
            type="password"
            key="password"
            value={values.password}
            onChange={handleChange("password")}
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

export default Login;
