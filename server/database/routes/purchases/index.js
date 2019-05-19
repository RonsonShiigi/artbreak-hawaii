const express = require("express");
const router = express.Router();

router
  .route("/purchases")
  .get((req, res) => {
    return new req.database.Purchases()
      .fetchAll()
      .then(purchases => {
        return res.json(purchases);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })
  .post((req, res) => {
    console.log("hitting");
    const purchases_id = req.body.id;
    const product_id = req.body.product_id;
    const user_id = req.body.user_id;
    const purchased_at = req.body.purchased_at;
    const price = req.body.price;
    const tax = req.body.tax;
    const confirmation_number = req.body.confirmation_number;

    console.log("post", req.body);
    return new req.database.Purchases({
      purchases_id,
      product_id,
      user_id,
      purchased_at,
      price,
      tax,
      confirmation_number
    })
      .save()
      .then(user => {
        return res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });

module.exports = router;
