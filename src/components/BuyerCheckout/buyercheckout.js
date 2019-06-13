import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";

const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

class BuyerCheckout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      uriToken: null
    };
    this.onToken = this.onToken.bind(this);
  }
  componentDidMount = e => {
    const tokenUrl = new URLSearchParams(document.location.search.substring(1));
    const token = tokenUrl.get("tkn");
    console.log("TOKEN", token);
    if (token) {
      this.setState({ uriToken: token });
    }
    // fetch(`http://localhost:8080/invoice/${token}`)
    //   .then(res => {
    //     return res.json();
    //   })
    //   .then(itemsData => {
    //     console.log("ITEMS DATA", itemsData);
    //     this.setState({ items: itemsData });
    //     console.log("This State", this.state.items);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  onToken(token) {
    console.log("onToken", token);
    fetch("http://localhost:8080/payment/checkout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        stripeToken: token.id
      }),
      credentials: "include"
    })
      .then(res => {
        window.location.replace("http://localhost:8081/");
      })
      .catch(err => {
        console.log("ERROR on TOKEN", err);
      });
  }

  render() {
    const { uriToken, items } = this.state;
    console.log("ITEMS", items);
    console.log("TKN", uriToken);
    let total = 0;
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
        Hello
      </div>
    );
    //   <div>
    // <h2>ArtBreak Invoice<h2>
    //     <div>Total:$ {items[0].}</div>

    // <div>
    //   <StripeCheckout
    //     key="stripe-checkout"
    //     token={this.onToken}
    //     stripeKey="pk_test_dFwJK6MxVB2Jj5XDUuaFAoIl00oVxjFN1t"
    //   />
    // </div>;
    //   </div>
  }
}

export default BuyerCheckout;
