import React, { Component } from "react";
import "./stripeReg.css";

class StripeReg extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <a
          href="https://connect.stripe.com/express/oauth/authorize?redirect_uri=http://localhost:8081/sRegistration/&client_id=ca_F6kPBqo4vTmkjzWnkrRdOXZryq7SZv9v&state={STATE_VALUE}"
          class="stripe-connect"
        >
          <span>Connect with Stripe</span>
        </a>
      </div>
    );
  }
}

export default StripeReg;
