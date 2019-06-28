import React from "react";
import { Link } from "react-router-dom";

const PaymentConfirmation = () => {
  return (
    <div className="container">
      {localStorage.getItem("username") === null ? (
        <div className="paper-holder">
          <h1>
            Please{" "}
            <Link to="/login">
              <b>log in</b>
            </Link>
            <b>
              <i>!</i>
            </b>
          </h1>
          <span className="confirmation-msg">
            H-How did you even get here...?
          </span>
          <Link to="/register">Don't have an account yet?</Link>
        </div>
      ) : (
        <div className="paper-holder">
          <h1 className="emoji">
            <span role="img" aria-label="confetti emoji">
              🎊🎊🎊
            </span>
          </h1>
          <h1>
            Thank you for your purchase
            <b>
              <i>!</i>
            </b>
          </h1>
          <span className="confirmation-msg">
            Order confirmation has been sent to the provided email.
          </span>

          <Link to="/"> Browse Some Moar!!</Link>
        </div>
      )}
    </div>
  );
};

export default PaymentConfirmation;
