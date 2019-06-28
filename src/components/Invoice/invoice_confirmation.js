import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

class Invoice_Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: ""
    };
  }
  componentDidMount() {
    this.setState({ user_id: localStorage.getItem("userId") });
  }

  render() {
    return (
      <div className="container">
        <div className="paper-holder">
          <h1 className="emoji">🎉🎉🎉</h1>
          <h1>
            Congratulations
            <b>
              <i>!</i>
            </b>
          </h1>
          <span className="confirmation-msg">
            Your invoice has been sent. Yay, you! What's next?
          </span>
          <br />
          <ul>
            <li>
              {" "}
              <Link to="/dashboard">Return To Dashboard</Link>
            </li>
            <li>
              <b>OR</b>
            </li>
            <li>
              <Link to="/invoice">Send another invoice</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Invoice_Confirmation;
