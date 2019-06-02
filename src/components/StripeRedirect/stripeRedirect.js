import React, { Component } from "react";
import "./stripeRedirect.css";

class StripeRedirect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //creating the authorization code sent back from stripe
    const urlQuery = window.location.search;
    const auth_code = urlQuery.slice(
      urlQuery.indexOf("code=") + 5,
      urlQuery.indexOf("&state")
    );
    const user_id = localStorage.getItem("userId");

    fetch("http://localhost:8080/sRegistration/", {
      body: JSON.stringify({
        userid: user_id,
        authcode: auth_code
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      credentials: "include"
    })
      .then(res => {
        console.log("RES", res.body);
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>PROCESSING!!!</div>
      </div>
    );
  }
}

export default StripeRedirect;
