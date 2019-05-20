const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    return new req.database.Product()
      .fetchAll()
      .then(products => {
        return res.json(products);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })
  .post((req, res) => {
    console.log("hitting");

    const title = req.body.title;
    const description = req.body.description;
    const image_url = req.body.image_url;
    const user_id = req.body.user_id;
    const price = req.body.price;

    console.log("post", req.body);
    return new req.database.Product({
      title,
      description,
      image_url,
      user_id,
      price
    })
      .save()
      .then(products => {
        return res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });

module.exports = router;
