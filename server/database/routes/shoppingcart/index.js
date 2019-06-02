const express = require("express");
const router = express.Router();
const ShoppingCart = require("../../models/ShoppingCartModel.js");

router
  //Get all users shopping cart items by user_id.
  .route("/:id")
  .get((req, res) => {
    ShoppingCart.where({ user_id: req.params.id })
      .fetchAll()
      .then(items => {
        res.json(items);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })
  //delete shopping cart item by the id in the shopping cart.
  .delete((req, res) => {
    ShoppingCart.where({ id: req.body.id })
      .fetch()
      .then(item => {
        new ShoppingCart({ id: req.body.id }).destroy().then(() => {
          return res.redirect("/");
        });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })
  //post a new item to the shopping cart.
  .post((req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const image_url = req.body.image_url;
    const price = req.body.price;
    const seller_id = req.body.user_id;
    const user_id = req.params.id; //May have to store this in redux?

    return new req.database.ShoppingCart({
      title,
      description,
      image_url,
      price,
      seller_id,
      user_id
    })
      .save()
      .then(item => {
        return res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });

module.exports = router;
