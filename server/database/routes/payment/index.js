"use strict";
const express = require("express");
const router = express.Router();
require("dotenv").config({ path: "../../.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../../models/UsersModel.js");
const Invoice = require("../../models/InvoiceModel");
const Refund = require("../../models/RefundsModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

//charge the purchased item
router.route("/checkout").post((req, res) => {
  const {
    stripeToken,
    total,
    userId,
    uriToken,
    purchasedItem,
    buyerE
  } = req.body;
  let username;
  let sellerEmail;

  User.where({ id: userId })
    .fetchAll()
    .then(user => {
      const userData = user.toJSON();
      const stripeAcct = userData[0].stripe_id;
      username = userData[0].username;
      sellerEmail = userData[0].email;
      return stripeAcct;
    })
    .then(account => {
      const totalAmt = parseInt(total, 10) * 100;
      const transferTotal = totalAmt - totalAmt * 0.04;

      stripe.charges
        .create({
          amount: totalAmt,
          currency: "usd",
          source: stripeToken,
          transfer_data: {
            destination: account,
            amount: transferTotal
          }
        })
        .then(function(charge) {
          const chargeId = charge.id;
          const billingEmail = charge.billing_details.name;
          new Invoice()
            .where({ token: uriToken })
            .save(
              {
                paid: true,
                charge_id: chargeId,
                purchased_at: new Date(),
                refund_available: parseFloat(totalAmt / 100),
                refund: false
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

              //email message confirmation to buyer of purchase
              const buyerConfirmation = {
                from: "ArtBreakUserProvisioning@gmail.com",
                to: `${billingEmail}`,
                subject: `ArtBreak Payment Confirmation #: ${chargeId}`,
                text: `Thank you for your recent purchase from ${username}! Your credit card was charge for a total of $ ${total} for your recent purchase: ${purchasedItem}.\n\n`
              };

              //email messsage confirmation to seller of purchase of product
              const sellerConfirmation = {
                from: "ArtBreakUserProvisioning@gmail.com",
                to: `${sellerEmail}`,
                subject: `ArtBreak Payment Confirmation of Bought Item ${purchasedItem} #: ${chargeId}`,
                text: `Congratulations! ${billingEmail} has purchased ${purchasedItem} for a total of $ ${total}!\n\n`
              };

              //send email to buyer
              transporter.sendMail(buyerConfirmation, (error, response) => {
                if (error) {
                  return res.json({
                    message: "Buyer Confrimation Email Error"
                  });
                } else {
                  return res.json({
                    message: "200"
                  });
                }
              });

              //send email to seller
              transporter.sendMail(sellerConfirmation, (error, response) => {
                if (error) {
                  return res.json({
                    message: "Seller Confirmation Email Error"
                  });
                } else {
                  return res.json({
                    message: "200"
                  });
                }
              });

              return res.json({
                message: "Payment Success"
              });
            })
            .catch(err => {
              console.log("err", err);
              return res.json({ message: "500" });
            });
        });
    })
    .catch(err => {
      return res.json({ message: "500" });
    });
});

//refund partial or full amount.
router.route("/refund").post((req, res) => {
  const chargeId = req.body.charge_id;
  let refundTotal = req.body.amount;
  refundTotal = parseInt(refundTotal, 10) * 100;
  let invId;

  Invoice.where({ charge_id: req.body.charge_id })
    .fetchAll()
    .then(data => {
      const invoiceData = data.toJSON();
      return invoiceData;
    })
    .then(invData => {
      if (!invData) {
        //if no invoice data returned, data not found
        return res.json({ message: "Refund not available" });
      } else {
        //check if the refund total is greater than or equal to refund available
        let refundAvailble = invData[0].refund_available;
        refundAvailble = parseInt(refundAvailble, 10) * 100;
        invId = invData[0].id;
        if (refundTotal > refundAvailble) {
          return res.json({
            message: "Refund total more than refund available"
          });
        } else {
          //create the refund
          stripe.refunds.create(
            {
              amount: refundTotal,
              charge: chargeId,
              reverse_transfer: true
            },
            (err, refund) => {
              if (err) {
                console.log("ERRR", err);
                res.json({ message: "Refund Error" });
              } else {
                new Refund()
                  .save(
                    {
                      invoice_id: invId,
                      refund_id: refund.id,
                      amount: refundTotal
                    },
                    { patch: true }
                  )
                  .then(() => {
                    res.json({ message: "Success" });
                  })
                  .catch(err => {
                    res.json({ message: "Unknown Error" });
                  });
              }
            }
          );
        }
      }
    })
    .catch(err => {
      console.log("ERR", err);
    });
});

module.exports = router;
