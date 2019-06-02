import React, { Component } from "react";
import "./stripeRedirect.css";

const dotenv = require("dotenv");
dotenv.config();
// dotenv.config({ path: "../../../../.env" });

class StripeRedirect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    console.log("Window.location.search", window.location.search);
    const urlQuery = window.location.search;
    const authCode = urlQuery.slice(
      urlQuery.indexOf("code=") + 5,
      urlQuery.indexOf("&state")
    );
    console.log("AUTH CODE", authCode);
    console.log("PROCESS", process.env.REACT_APP_STRIPE_SK);
    console.log("PROCESS", process.env.REACT_APP_STRIPE_PK);

    fetch("https://connect.stripe.com/oauth/token", {
      method: "POST",
      mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "x-www-form-urlencoded",
        Authorization: `Bearer ${process.env.REACT_APP_STRIPE_PK}`
      },
      body: {
        client_secret: process.env.REACT_APP_STRIPE_SK,
        code: authCode,
        grant_type: "authorization_code"
      },
      credentials: "include"
    })
      .then(res => {
        console.log("HELLO");
        console.log("RES", res.body);
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }

  render() {
    return <div>Processing!!!!!</div>;
  }
}

export default StripeRedirect;
