import React, { Component } from "react";
import axios from "axios";
import "./Register.css";

import { withStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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

function Register() {
  const [values, setValues] = React.useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    username: ""
  });

  const handleChange = name => e => {
    setValues({ ...values, [name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log("state", values);
    fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
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
        console.log("User added to database");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Paper className="formHolder">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <CssText
            id="email"
            label="email"
            key="email"
            value={values.email}
            onChange={handleChange("email")}
            margin="normal"
            fullWidth={true}
            variant="outlined"
          />
          <CssText
            id="password"
            label="password"
            key="password"
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            fullWidth={true}
            variant="outlined"
          />
          <CssText
            id="username"
            label="username"
            key="username"
            value={values.username}
            onChange={handleChange("username")}
            margin="normal"
            fullWidth={true}
            variant="outlined"
          />
          <CssText
            id="first_name"
            label="first_name"
            key="first_name"
            value={values.first_name}
            onChange={handleChange("first_name")}
            margin="normal"
            fullWidth={true}
            variant="outlined"
          />
          <CssText
            id="last_name"
            label="last_name"
            key="last_name"
            value={values.last_name}
            onChange={handleChange("last_name")}
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
export default Register;
