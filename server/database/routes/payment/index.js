const express = require("express");
const router = express.Router();
require("dotenv").config({ path: "../../.env" });
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.route("/checkout").post((req, res) => {
  console.log(process.env.STRIPE_PUBLIC_KEY);
  const stripeToken = req.body.stripeToken;
  const buyer_id = 4; //NEED TO MAKE DYNAMIC*****************************!!!!!!!!******
  stripe.charges.create(
    {
      amount: 7500,
      currency: "usd",
      description: "Test Transfer two accts charge",
      source: stripeToken,
      transfer_group: "GROUP_1" //NEED TO MAKE DYNAMIC****************************!!!!!!!!!***********
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
        const chargeId = charge.id;
        return new req.database.ShoppingCart()
          .where({ user_id: buyer_id })
          .fetchAll()
          .then(cart => {
            const shopcart = cart.toJSON();
            const uniqueSellerIds = [];
            const paymentTotalBySeller = [];

            const EXAMPLE_ACCOUNTS = [
              { 2: "acct_1EerFTDw13fboP1Q" },
              { 3: "acct_1EcrLmCKwkcOYd4y" }
            ]; //may need to store the Stripe accounts in a database linked to user_id and retrieve upon payment.**************!!!!!!!!************

            //get unique seller id values and store into uniqueSellerId Array
            shopcart.forEach(item => {
              if (!uniqueSellerIds.includes(item.seller_id)) {
                uniqueSellerIds.push(item.seller_id);
              }
            });

            console.log("UNIQUE SELLERS", uniqueSellerIds);

            /*loop through uniqueSellerId Array, accumulate totals per seller, push up into paymentTotalBySeller Array by tuple [seller_id, total transfer payment]*/

            for (i = 0; i < uniqueSellerIds.length; i++) {
              let sellerId = uniqueSellerIds[i];
              let sellerIdTotal = [];
              let paymentTotal = 0;
              for (j = 0; j < shopcart.length; j++) {
                if (shopcart[j].seller_id === sellerId) {
                  paymentTotal += parseInt(shopcart[j].price, 10);
                }
              }
              sellerIdTotal.push(uniqueSellerIds[i], paymentTotal);
              paymentTotalBySeller.push(sellerIdTotal);
            }

            console.log("PAYMENT TOTALS BY SELLER ID", paymentTotalBySeller);

            /*loop through paymentTotalBySeller Array to create total transfer charges to each stripe connect account corresponding to the seller_id*/

            for (i = 0; i < EXAMPLE_ACCOUNTS.length; i++) {
              let sellerId = EXAMPLE_ACCOUNTS[i];
              const objKey = Object.keys(sellerId);
              console.log("OBJ KEY", objKey);
              console.log("SELLER ID", sellerId);
              for (j = 0; j < paymentTotalBySeller.length; j++) {
                console.log("OBJECT KEY", typeof objKey[0]);
                console.log("PAYMENT", typeof paymentTotalBySeller[j][0]);
                console.log("DESTINATION", sellerId[objKey]);
                console.log("PAYMENT AMOUNT", paymentTotalBySeller[j][1] * 100);
                if (parseInt(objKey[0]) === paymentTotalBySeller[j][0]) {
                  stripe.transfers
                    .create({
                      amount: paymentTotalBySeller[j][1] * 100,
                      currency: "usd",
                      source_transaction: chargeId,
                      destination: sellerId[objKey],
                      transfer_group: "GROUP_1"
                    })
                    .then(transfer => {
                      console.log("TRANSFER DATA", transfer);
                    })
                    .catch(err => {
                      console.log("TRANSFER ERROR", err);
                    });
                }
              }
            }

            // res.send({
            //   success: true,
            //   message: "You have reached the shopping cart!!!"
            // });
          })
          .catch(err => {
            console.log("SHOPPING CART DB ERROR", err);
          });
        // res.send({
        //   success: true,
        //   message: "Successs!!"

        // });
      }
    }
  );
});

// router.route("/account/get").get((req, res) => {
//   const stripeAccountId = null;
//   if (!stripeAccountId) {
//     res.send({
//       success: true,
//       message: ""
//     });
//   } else {
//     res.send({
//       success: true,
//       message: "Stripe Account",
//       setupBegan: true
//     });
//   }
// });

module.exports = router;
