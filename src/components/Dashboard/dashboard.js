import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dashtabs from "./Dashtabs";
import "./dashboard.css";

//stripe button
import StripeReg from "../StripeReg/stripeReg.js";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: 0,
      username: "",
      stripeReg: false,
      error: false
    };
  }
  async componentDidMount() {
    if (this.props.location.error) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      this.setState({ stripeReg: false });
    }
    if (localStorage.getItem("username") !== null) {
      this.state.user_id = localStorage.getItem("userId");
      this.state.username = localStorage.getItem("username");
      fetch(`http://localhost:8080/users/${this.state.user_id}`)
        .then(res => {
          const data = res.json();
          return data;
        })
        .then(stripe => {
          this.setState({ stripeReg: stripe.stripeSignUp });
        })
        .catch(err => {
          this.setState({ error: true });
        });
    }
  }

  render() {
    const { stripeReg, error } = this.state;
    return (
      <div className="container">
        {localStorage.getItem("username") === null ? (
          <div className="not-logged-in">
            <h1>log tf in, heathen</h1>
          </div>
        ) : (
          <React.Fragment>
            <div className="left-nav">
              <ul className="left-links">
                <h3>Dashboard</h3>
                <li>
                  <Link to={`users/${localStorage.userId}`}>My Profile</Link>
                </li>
                <li>My Uploads</li>
                <li>My Favorites</li>
                <li>My Orders/Invoices</li>
              </ul>
              <br />
              <div>
                {!stripeReg ? (
                  <div>
                    <div className="left-links">
                      Become A Seller! <br />
                      Sign up for Stripe Below:
                    </div>
                    <StripeReg />
                    {error ? <div>Internal Error, please try again</div> : null}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="right-nav">
              <Dashtabs />
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Dashboard;
