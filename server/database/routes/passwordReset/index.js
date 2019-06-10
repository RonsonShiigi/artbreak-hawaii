const express = require("express");
const router = express.Router();
const User = require("../../models/UsersModel.js");
require("dotenv").config();
const nodemailer = require("nodemailer");
const crypto = require("crypto");

//check database for user and send email if user found.
router.route("/").post((req, res) => {
  if (req.body.email === "") {
    res.json("email required");
  }
  const userEmail = req.body.email;
  console.log("REQ EMAIL", req.body.email);

  User.where({ email: req.body.email })
    .fetch()
    .then(user => {
      if (user == null) {
        console.log("email not in database");
        res.json("email not in db");
      } else {
        const token = crypto.randomBytes(20).toString("hex");
        console.log("TOKEN", token);

        new req.database.User()
          .where({ email: req.body.email })
          .save(
            {
              resetPasswordToken: token,
              resetPasswordExpires: Date.now() + 360000
            },
            { patch: true }
          )
          .then(() => {
            const transporter = nodemailer.createTransport({
              service: "gmail",
              auth: {
                user: `${process.env.GMAIL_ACCT}`,
                pass: `${process.env.GMAIL_PW}`
              }
            });

            const mailOptions = {
              from: "ArtBreakUserProvisioning@gmail.com",
              to: `${userEmail}`,
              subject: "Reset Your ArtBreak HI Password",
              text:
                `Forgot your password, no problem. Creative minds have no room for mundane things such as passwords. \n\n` +
                `Time flys when you're having fun, don't let this bad boy expire. Click or paste this link into your browser to complete the process within one hour. \n\n` +
                `http://localhost:8081/reset/${token}\n\n` +
                "If you did not request this, please ignore this email and your password will remain unchanged."
            };
            console.log("SENDING MAIL!!!");
            transporter.sendMail(mailOptions, (err, res) => {
              if (err) {
                console.error("there was an error", err);
              } else {
                console.log("here is the res: ", res);
                res.status(200).json("recovery email sent");
              }
            });
          });
      }
    })

    .catch(err => {
      console.log("Error", err);
      res.send(401);
    });
});

module.exports = router;
