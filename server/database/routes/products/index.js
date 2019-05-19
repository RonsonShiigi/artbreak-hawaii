const express = require("express");
const router = express.Router();

router
  .route("/users")
  .get((req, res) => {
    return new req.database.Products()
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
    const product_id = req.body.id;
    const title = req.body.title;
    const description = req.body.description;
    const image_url = req.body.image_url;
    const user_id = req.body.user_id;
    const price = req.body.price;
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;

    console.log("post", req.body);
    return new req.database.Products({
      product_id,
      title,
      description,
      image_url,
      user_id,
      price,
      created_at,
      updated_at
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
