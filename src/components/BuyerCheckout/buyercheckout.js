import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import { Redirect } from "react-router";

const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

class BuyerCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      paid: false,
      price: "",
      description: "",
      uriToken: null,
      artist: "",
      error: false,
      buyerEmail: "",
      redirect: false,
      isLoggedIn: false
    };
    this.onToken = this.onToken.bind(this);
  }
  componentDidMount = e => {
    const tokenUrl = new URLSearchParams(document.location.search.substring(1));
    const token = tokenUrl.get("tkn");
    if (token) {
      this.setState({ uriToken: token });
    }
    fetch(`http://localhost:8080/invoice/${token}`)
      .then(res => {
        return res.json();
      })
      .then(itemsData => {
        this.setState({ userId: itemsData.user_id });
        this.setState({ paid: itemsData.paid });
        this.setState({ price: itemsData.price });
        this.setState({ description: itemsData.description });
        this.setState({ buyerEmail: itemsData.buyerEmail });
        this.setState({ artist: itemsData.user_id });
      })
      .then(() => {
        fetch(`http://localhost:8080/users/${this.state.userId}`)
          .then(res => {
            return res.json();
          })
          .then(user => {
            this.setState({ name: user.username });
          })
          .catch(err => {
            this.setState({ error: true });
          });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onToken(token, addresses) {
    fetch("http://localhost:8080/payment/checkout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stripeToken: token.id,
        billingE: token.email,
        total: this.state.price,
        userId: this.state.artist,
        uriToken: this.state.uriToken,
        purchasedItem: this.state.description,
        buyerE: this.state.buyerEmail
      }),
      credentials: "include"
    })
      .then(res => {
        const resData = res.json();
        return resData;
      })
      .then(data => {
        const { message } = data;
        switch (message) {
          case "Payment Success":
            this.setState({ redirect: true });
            break;
          case "500":
            this.setState({ error: true });
            break;
          default:
            return;
        }
      })
      .catch(err => {
        console.log("ERROR on TOKEN", err);
        this.setState({ error: true });
      });
  }

  render() {
    const { uriToken, paid, price, name, redirect, error } = this.state;

    function CheckRedirect(props) {
      const checkRedirect = props.isRedirect;
      if (checkRedirect && !error) {
        return <Redirect to="/paymentConfirmation" />;
      } else if (checkRedirect && error) {
        return <Redirect to="/checkoutError" />;
      } else {
        return null;
      }
    }
    return (
      <div className="container">
        {!uriToken ? (
          <div>ACCESS DENIED</div>
        ) : (
          <div>
            {paid ? (
              <h1> This Invoice Has Already Been Paid</h1>
            ) : (
              <div>
                <h2>ArtBreak Invoice</h2>
                <div>You are purchasing commissioned art from {name}!</div>
                <br />
                <br />
                Total owed for Invoice # {uriToken} is:
                <br />$ {price}
                <br />
                If you are ready to checkout, please click on below to submit
                your payment through Stripe! below:
                <br />
                <StripeCheckout
                  key="stripe-checkout"
                  token={this.onToken}
                  stripeKey={process.env.REACT_APP_STRIPE_PK}
                  billingAddress
                  shippingAddress
                  name={name}
                  amount={price * 100}
                />
              </div>
            )}
            <CheckRedirect isRedirect={this.state.redirect} />
          </div>
        )}
      </div>
    );
  }
}

export default BuyerCheckout;
