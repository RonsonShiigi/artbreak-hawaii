import React from "react";
import { Link } from "react-router-dom";

function RefundConfirmation() {
  return (
    <div className="container">
      <div className="paper-holder">
        <h1 className="emoji">
          <span role="img" aria-label="confetti emoji">
            🎊🎊🎊
          </span>
        </h1>
        <h1>
          Refund successful
          <b>
            <i>!</i>
          </b>
        </h1>
        <Link to="/dashboard"> Return to Dashboard</Link>
      </div>
    </div>
  );
}

export default RefundConfirmation;
