import React, { Component } from "react";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./cover.css";

const logo = require("../assets/logo.png");

function Cover() {
  return (
    <div className="cover-holder">
      <div className="cover-back" />
      <div className="glitch" data-text="ARTBREAK.">
        <h1>artbreak.</h1>
      </div>
      <h2>a platform for badasses.</h2>
      <div className="cover-arrow">
        <Link to="/login">
          <Button variant="contained" color="secondary" size="large">
            Log In
          </Button>{" "}
        </Link>
        <Button variant="contained" color="secondary" size="large">
          Sign Up
        </Button>
      </div>
    </div>
  );
}

export default Cover;
