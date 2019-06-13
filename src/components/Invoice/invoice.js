import React, { Component } from "react";

import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: "",
      email: "",
      price: "",
      description: ""
    };
  }

  componentDidMount() {
    // console.log(localStorage.getItem("userId"));
    this.setState({ user_id: localStorage.getItem("userId") });
    console.log("invoicestate", this.state);
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({ [name]: e.target.value });
  };

  render() {
    return (
      <div className="invoice-form">
        <h1>Send Invoice to Buyer</h1>
        <form>
          <TextField
            id="email"
            label="email of buyer"
            name="email"
            onChange={this.handleChange}
          />
          <TextField
            id="description"
            label="description"
            name="description"
            onChange={this.handleChange}
          />
          <TextField
            id="price"
            label="price"
            name="price"
            onChange={this.handleChange}
          />

          <Button type="submit">Send Now =></Button>
        </form>
      </div>
    );
  }
}

export default Invoice;
