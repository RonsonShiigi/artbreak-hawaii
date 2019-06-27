import React, { Component } from "react";
import { Link } from "react-router-dom";

class PaymentConfirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isError: null,
      isPaid: null
    };
  }
  componentDidMount() {
    if (this.props.location.error) {
      this.setState({ isError: true });
    }

    if (this.props.location.paid) {
      this.setState({ isPaid: true });
    }
  }

  render() {
    console.log("THIS STATE", this.state);
    const { isPaid, isError } = this.state;

    return (
      <div className="container">
        <div className="paper-holder">
          {isPaid && !isError ? (
            <React.Fragment>
              <h1 className="emoji">🎊🎊🎊</h1>
              <h1>
                Thank you for your purchase
                <b>
                  <i>!</i>
                </b>
              </h1>
              <span className="confirmation-msg">
                A confirmation email has been sent to the provided email.
              </span>

              <Link to="/"> Browse Some Moar!!</Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h1 className="emoji">😵</h1>
              <h1>Payment failed.</h1>
              <span className="confirmation-msg">
                Please contact us at ArtBreakHIUserProvisioning@gmail.com.
              </span>
              <Link to="/dashboard">Return to dashboard</Link>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default PaymentConfirmation;
