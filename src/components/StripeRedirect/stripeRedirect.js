import React, { Component } from "react";
import "./stripeRedirect.css";
import { Route, Redirect } from "react-router-dom";

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
    //get user id from local storage
    const user_id = localStorage.getItem("userId");

    fetch("http://localhost:8080/sRegistration/", {
      body: JSON.stringify({
        userid: user_id,
        authCode: auth_code
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: "POST",
      credentials: "include"
    })
      .then(() => {
        ///some code to store state and renderdirect to antoehr page.
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }

  render() {
    return <div>{/* <Redirect to="/" /> */}</div>;
  }
}

export default StripeRedirect;
