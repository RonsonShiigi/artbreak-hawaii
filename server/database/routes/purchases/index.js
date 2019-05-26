const express = require("express");
const router = express.Router();
const Purchase = require("../../models/PurchasesModel.js");

router
  .route("/")

  // RENDER PURCHASE
  .get((req, res) => {
    return new req.database.Purchase()
      .fetchAll()
      .then(purchases => {
        return res.json(purchases);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })

  // CREATE PURCHASE
  .post((req, res) => {
    console.log("hitting");

    const product_id = req.body.product_id;
    const user_id = req.body.user_id;
    const price = req.body.price;
    const tax = req.body.tax;
    const confirmation_number = req.body.confirmation_number;

    console.log("post", req.body);
    return new req.database.Purchase({
      product_id,
      user_id,
      price,
      tax,
      confirmation_number
    })
      .save()
      .then(purchase => {
        return res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });

// EDIT PURCHASE
router.put("/:id", (req, res) => {
  const body = req.body;
  const paramsId = req.params.id;

  Purchase.where({
    id: paramsId
  })
    .fetch()
    .then(purchase => {
      new Purchase({
        id: paramsId
      })
        .save(
          {
            product_id: req.body.product_id,
            user_id: req.body.user_id,
            price: req.body.price,
            tax: req.body.tax,
            confirmation_number: req.body.confirmation
          },
          {
            patch: true
          }
        )
        .then(() => {
          return res.redirect("/");
        });
    });
});

// DELETE PURCHASE
router.delete("/:id", (req, res) => {
  const paramsId = req.params.id;

  Purchase.where({
    id: paramsId
  })
    .fetch()
    .then(purchase => {
      new Purchase({
        id: paramsId
      })
        .destroy()
        .then(() => {
          return res.redirect("/");
        });
    });
});

module.exports = router;
