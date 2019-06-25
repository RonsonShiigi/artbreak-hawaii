import React, { Component } from "react";
import { Link } from "react-router-dom";

function RefundConfirmation() {
  return (
    <div className="container">
      <h1>Refund was successful</h1>
      <Link to="/dashboard"> Return to Dashboard</Link>
    </div>
  );
}

export default RefundConfirmation;
