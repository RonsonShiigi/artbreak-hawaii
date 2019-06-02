const express = require("express");
const request = require("request");
const router = express.Router();

router.route("/").post((req, res) => {
  console.log("req", req.body.authcode);
  // request.post(
  //   {
  //     url: "https://connect.stripe.com/oauth/token",
  //     body: `client_secret=sk_test_9nS3sfuyze04bRNHJJD1pXjZ006wVUe7xP&code=${
  //       req.body.authCode
  //     }&grant_type=authorization_code`,
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/x-www-form-urlencoded"
  //     }
  //   },
  //   (error, response, body) => {
  //     console.log("response", response);
  //   }
  // );
});

module.exports = router;
