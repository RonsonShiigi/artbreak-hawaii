import React, { Component } from "react";
import { Link } from "react-router-dom";

class InvoiceError extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: ""
    };
  }
  render() {
    return (
      <div className="container">
        <div className="paper-holder">
          <h1> Please Fill Out All Fields of Invoice</h1>
          <Link to="/invoice">Try Again</Link>
        </div>
      </div>
    );
  }
}
export default InvoiceError;
