import React, { Component } from "react";
import "./stripeRedirect.css";
import { Redirect } from "react-router-dom";

class StripeRedirect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      error: false
    };
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
      .then(res => {
        const data = res.json();
        return data;
      })
      .then(msgData => {
        const message = msgData.message;
        switch (message) {
          case "Success":
            this.setState({ redirect: true });
            break;
          case "500":
            break;
          default:
            return null;
        }
        console.log("Data", msgData);
      })
      .catch(err => {
        console.log("ERROR", err);
      });
  }

  render() {
    const { redirect, error } = this.state;
    console.log("THIS", redirect);
    return (
      <div>
        {redirect ? (
          <Redirect to={{ pathname: "/Dashboard", error: error }} />
        ) : null}
      </div>
    );
  }
}

export default StripeRedirect;
