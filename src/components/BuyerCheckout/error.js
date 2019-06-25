import React from "react";
import { Link } from "react-router-dom";

const CheckoutError = () => {
  return (
    <div className="container">
      <h1>
        Checkout Error Occurred, Please Contact
        ArtbreakUserProvisioning@gmail.com
      </h1>
      <Link to="/"> Browse Some Moar!!</Link>
    </div>
  );
};

export default CheckoutError;
