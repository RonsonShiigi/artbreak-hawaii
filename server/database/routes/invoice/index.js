const express = require("express");
const router = express.Router();
const User = require("../../models/UsersModel.js");
require("dotenv").config();
const Invoice = require("../../models/InvoiceModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

router.post("/", (req, res) => {
  if (req.body.email === "") {
    res.json({ message: "No Email Provided" });
  } else {
    const user_id = req.body.user_id;
    const buyerEmail = req.body.email;
    const price = req.body.price;
    const description = req.body.description;

    let status = "";
    console.log("req.body", req.body);

    return new Invoice({
      user_id,
      buyerEmail,
      price,
      description
    })
      .save()
      .then(invoices => {
        console.log("you have created a new invoice");
      })
      .then(data => {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: `${process.env.GMAIL_ACCT}`,
            pass: `${process.env.GMAIL_PW}`
          }
        });

        const mailOptions = {
          from: "ArtBreakUserProvisioning@gmail.com",
          to: `${buyerEmail}`,
          subject: "Invoice from ArtBreak Hi",
          text:
            `Hi, you are cool......\n\n` +
            `you are purchasing ${description} \n\n` +
            `Your total price will be ${price}`
        };

        transporter.sendMail(mailOptions, (error, response) => {
          if (error) {
            return res.json({ message: "401" });
          } else {
            console.log(buyerEmail);
            return res.json({ message: "200" });
          }
        });
      })
      .catch(err => {
        console.log("you are fucking up trying to create a new invoice", err);
      });
  }
});

module.exports = router;
