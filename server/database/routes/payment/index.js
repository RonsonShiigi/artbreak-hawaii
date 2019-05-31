"use strict";
const express = require("express");
const router = express.Router();
require("dotenv").config({ path: "../../.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.route("/checkout").post((req, res) => {
  console.log(process.env.STRIPE_PUBLIC_KEY);
  const stripeToken = req.body.stripeToken;
  // let uniqueSellerIds = [];
  let paymentTotalBySeller = [];
  let chargeId = "";
  let shopCartWithStripe;
  const buyer_id = 4; //NEED TO MAKE DYNAMIC*****************************!!!!!!!!******

  stripe.charges
    .create(
      {
        amount: 7500 /*NEED TO MAKE DYNAMIC - either pass from front end or start off with a database pull by user_id for their checkout cart*/,
        currency: "usd",
        description: "Test Transfer two accts charge",
        source: stripeToken,
        transfer_group: "GROUP_3" //NEED TO MAKE DYNAMIC****************************!!!!!!!!!***********
      },
      (err, charge) => {
        if (err) {
          console.log("ERR");
          res.send({
            success: false,
            message: "Eeerrroorrr"
          });
        } else {
          console.log("CHARGE", charge);
          chargeId = charge.id;
        }
      }
    )
    .then(() => {
      new req.database.ShoppingCart()
        .where({ user_id: buyer_id })
        .fetchAll()
        .then(cart => {
          const shopcart = cart.toJSON();
          console.log("Shopcart", shopcart);
          return shopcart;
        })
        .then(shopcart => {
          shopcart.forEach(item => {
            new req.database.User()
              .where({ id: item.seller_id })
              .fetchAll()
              .then(user => {
                let User = user.toJSON();
                console.log("USERRRR", user.toJSON());
                console.log("USER 0", User[0].stripe_id);
                console.log("item", item);
                const stripeId = User[0].stripe_id;
                console.log("stripeId", stripeId);
                stripe.transfers
                  .create({
                    amount: item.price * 100,
                    currency: "usd",
                    source_transaction: chargeId,
                    destination: stripeId,
                    transfer_group: "GROUP_3"
                  })
                  .then(transfer => {
                    console.log("TRANSFER DATA", transfer);
                  })
                  .catch(err => {
                    console.log("TRANSFER ERROR", err);
                  });
              })
              .catch(err => {
                console.log("ERRROR", err);
                res.send("Internal Server Error");
              });
          });
        })
        .catch(err => {
          "ERR", console.log(err);
          res.send("Internal Server Error");
        });
    })
    .then(() => {
      res.send("all done");
    });
});

module.exports = router;
