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
    const token = crypto.randomBytes(20).toString("hex");

    let status = "";
    console.log("req.body", req.body);

    return new Invoice({
      user_id,
      buyerEmail,
      price,
      description,
      token
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
            `Hello, Thank you for using Artbreak......\n\n` +
            `Your purchase will consist of  ${description} \n\n` +
            `Your total price will be $${price} \n\n` +
            `Please buy your shit here http://localhost:8081/buyercheckout/?tkn=${token} \n\n` +
            `Tell your mama i say hello`
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

// router.route.get("/:token", (req, res) => {
//   const invToken = req.params.token;
//   if (!invToken) {
//     res.json({ message: "Invalid link" });
//   } else {
//     Invoice.where({ token: invToken })
//       .fetchAll()
//       .then(inv => {
//         if (!inv[0]) {
//           res.json({ message: "No Invoice Found" });
//         } else {
//           const invData = {
//             user_id: inv.user_id,
//             payment: inv.payment,
//             description: inv.description
//           };
//           return res.json(invData);
//         }
//       })
//       .catch(err => {
//         console.log("ERROR", err);
//         res.json({ message: "500" });
//       });
//   }
// });

module.exports = router;
