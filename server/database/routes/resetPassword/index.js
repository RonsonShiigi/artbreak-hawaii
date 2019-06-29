const express = require("express");
const router = express.Router();
const User = require("../../models/UsersModel.js");
require("dotenv").config();
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

//check database for user and send reset email if user found
router.route("/").post((req, res) => {
  if (req.body.email === "") {
    res.json({ message: "No Email Provided" });
  } else {
    const userEmail = req.body.email;
    let status = "";

    User.where({ email: req.body.email })
      .fetch()
      .then(user => {
        if (user == null) {
          res.json({ message: "Email Not Found" });
        } else {
          const token = crypto.randomBytes(20).toString("hex");

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
              //use nodemailer to use gmail to authenticate artbreak email acct
              const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: `${process.env.GMAIL_ACCT}`,
                  pass: `${process.env.GMAIL_PW}`
                }
              });

              //message generated with reset link and token attached in uri
              const mailOptions = {
                from: "ArtBreakUserProvisioning@gmail.com",
                to: `${userEmail}`,
                subject: "Reset Your ArtBreak HI Password",
                text:
                  `Forgot your password, no problem. Creative minds have no room for mundane things such as passwords. \n\n` +
                  `Time flys when you're having fun, don't let this bad boy expire. Click or paste this link into your browser to complete the process within one hour. \n\n` +
                  `http://35.167.36.255:8081/resetPassword/?tkn=${token}\n\n` +
                  "If you did not request this, please ignore this email and your password will remain unchanged."
              };

              //send the email
              transporter.sendMail(mailOptions, (error, response) => {
                if (error) {
                  return res.json({ message: "401" });
                } else {
                  return res.json({ message: "200" });
                }
              });
            })
            .catch(err => {
              return res.json({ message: "500" });
            });
        }
      })
      .catch(err => {
        return res.json({ message: "500" });
      });
  }
});

const SALT_ROUND = 12;

//update database with new hash password from pw reset
router.route("/update").post((req, res) => {
  const dateNow = Date.now();
  const password = req.body.pw;

  User.where({ resetPasswordToken: req.body.token })
    .fetchAll()
    .then(user => {
      const userData = user.toJSON();

      //check if user exist with token match and check if token expired
      if (!userData[0] || user.resetPasswordExpires < dateNow) {
        res.json({ message: "401" });
      } else {
        const userId = userData[0].id;

        //create new hash password to store in database
        bcrypt
          .genSalt(SALT_ROUND)
          .then(salt => {
            return bcrypt.hash(password, salt);
          })
          .then(hash => {
            new User({
              id: userId
            })
              .save({ password: hash, updated_at: new Date() })
              .then(() => {
                return res.json({
                  message: "200",
                  username: user.username
                });
              })
              .catch(err => {
                console.log("ERR", err);
                return res.json({ message: "500" });
              });
          });
      }
    })
    .catch(err => {
      console.log("EEERRRR", err);
      return res.json({ messagae: "500" });
    });
});

module.exports = router;
