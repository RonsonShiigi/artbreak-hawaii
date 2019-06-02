import React, { Component } from "react";
import axios from "axios";
import "./logout.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function Logout(props) {
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
    fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        console.log("User Logged Out...");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <div className="logoutHolder">
        <form onSubmit={handleSubmit}>
          <Button
            type="submit"
            fullWidth="true"
            color="secondary"
            variant="contained"
          >
            LOGOUT U FAKA
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Logout;