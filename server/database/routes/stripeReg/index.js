const express = require("express");
const request = require("request");
const User = require("../../models/UsersModel.js");
const router = express.Router();

router.route("/").post((req, res) => {
  let authcode = req.body.auth_code;
  console.log("AUTHCODE", authcode);

  var dataString = `client_secret=sk_test_9nS3sfuyze04bRNHJJD1pXjZ006wVUe7xP&code=${authcode}&grant_type=authorization_code`;
  request.post(
    {
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      },
      url: "https://connect.stripe.com/oauth/token",
      body: dataString
    },
    (error, response, body) => {
      if (error) {
        console.log("error", error);
      } else {
        const bodyObj = JSON.parse(body);
        const stripeId = bodyObj.stripe_user_id;
        new req.database.User()
          .where({ id: userid })
          .fetch()
          .then(stripeid => {
            new User({ id: userid })
              .save({ stripe_id: stripeId })
              .then(() => {
                return res.redirect("http://localhost:8081/");
              })
              .catch(err => {
                console.log(err);
                res.sendStatus(500);
              });
          })
          .catch(err => {
            console.log(err);
            res.sendStatus(500);
          });
      }
    }
  );
});

module.exports = router;
