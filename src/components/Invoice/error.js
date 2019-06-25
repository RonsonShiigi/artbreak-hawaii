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
    console.log("hisam");
    return (
      <div className="container">
        <h1> Please Fill Out All Fields of Invoice</h1>
        <a href="http://localhost:8081/invoice">Try Again</a>
      </div>
    );
  }
}
export default InvoiceError;
