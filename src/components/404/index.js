import React, { Component } from "react";
import { Link } from "react-router-dom";

class Error extends Component {
  render() {
    return (
      <div className="container">
        <div className="paper-holder">
          <h1 className="emoji">
            <span role="img" aria-label="dead face emoji">
              😵😵😵
            </span>
          </h1>
          <h1>404!</h1>
          <span className="confirmation-msg">
            This isn't the page you're looking for!
          </span>
          <Link to="/">Why not head back to the main page?</Link>
        </div>
      </div>
    );
  }
}

export default Error;
