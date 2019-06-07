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
    </div>
  );
}

export default Cover;
