import React, { Component } from "react";
import axios from "axios";
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

export default function Register() {
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
        <h1 className="form-title">Register</h1>
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
            id="password"
            type="password"
            label="password"
            key="password"
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            fullWidth={true}
            variant="outlined"
          />
          <CssText
            id="first_name"
            label="first name"
            key="first_name"
            value={values.first_name}
            onChange={handleChange("first_name")}
            margin="normal"
            fullWidth={true}
            variant="outlined"
          />
          <CssText
            id="last_name"
            label="last name"
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
