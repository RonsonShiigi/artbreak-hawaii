"use strict";
const express = require("express");
const router = express.Router();
require("dotenv").config({ path: "../../.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../../models/UsersModel.js");
const Invoice = require("../../models/InvoiceModel");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

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
          console.log("CHARGE", charge);
          const billingEmail = charge.billing_details.name;
          new Invoice()
            .where({ token: uriToken })
            .save(
              { paid: true, charge_id: chargeId, purchased_at: new Date() },
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
      // stripe.charges
      //   .create({
      //     amount: parseInt(total, 10),
      //     currency: "usd",
      //     source: stripeToken,
      //     transfer_data: {
      //       amount: 10,
      //       destination: account
      //     }
      //   })
      //   .then(charge => {
      //     console.log("CHARGE", charge);
      //     console.log("TOKEN", uriToken);
      //     console.log("CHARGE.PAID", charge.paid);
      //     return new Invoice()
      //       .where({ token: uriToken })
      //       .save({ paid: true })
      //       .then(() => {
      //         console.log("PAIDDDD");
      //         return res.json({ message: "Payment Success" });
      //       })
      //       .catch(err => {
      //         console.log("err", err);
      //         return res.json({ message: "500" });
      //       });
      //   })
      //   .catch(err => {
      //     return res.json({ message: "Payment Error" });
      //   });
    })
    .catch(err => {
      return res.json({ message: "500" });
    });
});

// router.route("/checkout").post((req, res) => {
//   console.log(process.env.STRIPE_PUBLIC_KEY);
//   const stripeToken = req.body.stripeToken;
//   // let uniqueSellerIds = [];
//   let paymentTotalBySeller = [];
//   let chargeId = "";
//   let shopCartWithStripe;
//   const buyer_id = 4; //NEED TO MAKE DYNAMIC*****************************!!!!!!!!******

//   stripe.charges
//     .create(
//       {
//         amount: 7500 /*NEED TO MAKE DYNAMIC - either pass from front end or start off with a database pull by user_id for their checkout cart*/,
//         currency: "usd",
//         description: "Test Transfer two accts charge",
//         source: stripeToken,
//         transfer_group: "GROUP_3" //NEED TO MAKE DYNAMIC****************************!!!!!!!!!***********
//       },
//       (err, charge) => {
//         if (err) {
//           console.log("ERR");
//           res.send({
//             success: false,
//             message: "Eeerrroorrr"
//           });
//         } else {
//           console.log("CHARGE", charge);
//           chargeId = charge.id;
//           new req.database.ShoppingCart()
//             .where({ user_id: buyer_id })
//             .fetchAll()
//             .then(cart => {
//               const shopcart = cart.toJSON();
//               console.log("Shopcart", shopcart);
//               return shopcart;
//             })
//             .then(shopcart => {
//               new req.database.ShoppingCart()
//                 .where({ user_id: buyer_id })
//                 .destroy()
//                 .catch(err => {
//                   console.log("error on destroy", err);
//                 });
//               shopcart.forEach(item => {
//                 new req.database.User()
//                   .where({ id: item.seller_id })
//                   .fetchAll()
//                   .then(user => {
//                     let User = user.toJSON();
//                     console.log("USERRRR", user.toJSON());
//                     console.log("USER 0", User[0].stripe_id);
//                     console.log("item", item);
//                     const stripeId = User[0].stripe_id;
//                     console.log("stripeId", stripeId);
//                     stripe.transfers
//                       .create({
//                         amount: item.price * 100,
//                         currency: "usd",
//                         source_transaction: chargeId,
//                         destination: stripeId,
//                         transfer_group: "GROUP_3"
//                       })
//                       .then(transfer => {
//                         console.log("TRANSFER DATA", transfer);
//                       })
//                       .catch(err => {
//                         console.log("TRANSFER ERROR", err);
//                       });
//                   })
//                   .catch(err => {
//                     console.log("ERRROR", err);
//                     res.send("Internal Server Error");
//                   });
//               });
//             })
//             .catch(err => {
//               "ERR", console.log(err);
//               res.send("Internal Server Error");
//             });
//         }
//       }
//     )
//     .then(() => {
//       res.send("all done");
//     });
// });

router.route("/refund").post((req, res) => {
  const chargeId = req.body.charge_id;
  let refundTotal = req.body.amount;
  refundTotal = parseInt(refundTotal, 10) * 100;
  let invId;
  console.log("REFUND TOTAL", refundTotal);

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
        //check if the refund total is less than the paid amount
        let paidAmt = invData[0].price;
        paidAmt = parseInt(paidAmt, 10) * 100;
        console.log("PAID AMT", paidAmt);
        invId = invData[0].id;
        if (refundTotal >= paidAmt) {
          return res.json({ message: "Refund more than payment" });
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
                //save the refund id to invoice table
                new Invoice()
                  .where({ id: invId })
                  .save({ refund_id: refund.id, refund: true }, { patch: true })
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
