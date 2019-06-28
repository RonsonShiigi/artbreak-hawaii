import React from "react";
import { Link } from "react-router-dom";

const PaymentConfirmation = () => {
  return (
    <div className="container">
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
    </div>
  );
};

export default PaymentConfirmation;
