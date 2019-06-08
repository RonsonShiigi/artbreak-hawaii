import React from "react";
import Button from "@material-ui/core/Button";

function Logout(props) {
  const [values, setValues] = React.useState({
    email: "",
    password: ""
  });

  // const handleChange = name => e => {
  //   setValues({ ...values, [name]: e.target.value });
  // };
  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:8080/api/auth/logout", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        console.log(localStorage);
        window.localStorage.clear();
        console.log("useremail gone?", localStorage.getItem("userEmail"));
      })
      .then(() => {
        console.log("User Logged Out...");
      })
      .then(() => {
        window.location.replace("http://localhost:8081");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        variant="outlined"
        style={{
          input: {
            display: "none"
          }
        }}
      >
        LOGOUT
      </Button>
    </form>
  );
}

export default Logout;
