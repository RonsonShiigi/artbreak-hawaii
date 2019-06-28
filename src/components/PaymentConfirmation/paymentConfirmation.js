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
        {isPaid && !isError ? (
          <div className="container">
            <h1>
              Thank you for your purchase! A confirmation email has been sent to
              the provided email.
            </h1>
            <Link to="/"> Browse Some Moar!!</Link>
          </div>
        ) : (
          <h1>
            Internal Error Occured, Please Email us at
            ArtBreakHIUserProvisioning@gmail.com.
          </h1>
        )}
      </div>
    );
  }
}

export default PaymentConfirmation;
