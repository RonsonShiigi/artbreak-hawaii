import React from "react";
import { Link } from "react-router-dom";

const PaymentConfirmation = () => {
  return (
    <div className="container">
      <h1>
        Thank you for your purchase! A confirmation email has been sent to the
        provided email.
      </h1>
      <Link to="/"> Browse Some Moar!!</Link>
    </div>
  );
};

export default PaymentConfirmation;
