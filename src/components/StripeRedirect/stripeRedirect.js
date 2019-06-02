import React, { Component } from "react";
import "./stripeRedirect.css";

const dotenv = require("dotenv");
dotenv.config();

class StripeRedirect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const urlQuery = window.location.search;
    const authCode = urlQuery.slice(
      urlQuery.indexOf("code=") + 5,
      urlQuery.indexOf("&state")
    );

    console.log("AUTHCODE", authCode);
    // fetch("http://localhost:8080/sRegistration/", {
    //   body: JSON.stringify({
    //     authcode: authCode
    //   }),
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   method: "POST",
    //   credentials: "include"
    // }).then(res => {
    //   console.log("RES", res.body);
    // });
  }
  // console.log("AUTH CODE", authCode);
  // console.log("PROCESS", process.env.REACT_APP_STRIPE_SK);
  // console.log("PROCESS", process.env.REACT_APP_STRIPE_PK);
  // var dataString = `client_secret=sk_test_9nS3sfuyze04bRNHJJD1pXjZ006wVUe7xP&code=${authCode}&grant_type=authorization_code`;
  // var options = {
  //   method: "POST",
  //   mode: "no-cors",
  //   body: dataString,
  //   headers: {
  //     authorization: "Bearer sk_test_9nS3sfuyze04bRNHJJD1pXjZ006wVUe7xP",
  //     "content-type": "application/json"
  //   }
  // };
  // fetch("https://connect.stripe.com/oauth/token", {
  //   body: `client_secret=sk_test_9nS3sfuyze04bRNHJJD1pXjZ006wVUe7xP&code=${authCode}&grant_type=authorization_code`,
  //   headers: {
  //     Accept: "application/jsonp",
  //     "Content-Type": "application/x-www-form-urlencoded"
  //   },
  //   method: "POST",
  //   credentials: "same-origin",
  //   mode: "no-cors"
  // }).then(res => {
  //   console.log("RES", res.body);
  // });
  // const formData = {
  //   client_secret: `${process.env.REACT_APP_STRIPE_SK}`,
  //   code: authCode,
  //   grant_type: "authorization_code"
  // };
  // const formBody = Object.keys(formData)
  //   .map(
  //     key => encodeURIComponent(key) + "=" + encodeURIComponent(formData[key])
  //   )
  //   .join("&");
  // console.log("THIS FORM BODY!!!!!!!", formBody);
  // fetch("https://connect.stripe.com/oauth/token", options);
  // }

  //   fetch("https://connect.stripe.com/oauth/token", {
  //     method: "POST",
  //     mode: "no-cors",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "x-www-form-urlencoded",
  //       Authorization: `Bearer ${process.env.REACT_APP_STRIPE_PK}`
  //     },
  //     body: formBody,
  //     credentials: "include"
  //   })
  //     .then(res => {
  //       console.log("HELLO");
  //       console.log("RES", res.body);
  //     })
  //     .catch(err => {
  //       console.log("ERROR", err);
  //     });
  // }

  render() {
    return <div className="process">Processing!!!!!</div>;
  }
}

export default StripeRedirect;
