import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./cover.css";

function Cover() {
  return (
    <div className="cover-holder">
      <div className="cover-back" />
      <div className="glitch-cover" data-text="ARTBREAK.">
        ARTBREAK.
      </div>
      <div>
        <h2>a platform.</h2>
      </div>
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
