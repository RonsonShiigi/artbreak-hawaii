const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    return new req.database.Comment()
      .fetchAll()
      .then(comments => {
        return res.json(comments);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })
  .post((req, res) => {
    console.log("hitting");
    const text = req.body.text;
    const user_id = req.body.user_id;
    const product_id = req.body.product_id;
    console.log("post", req.body);
    return new req.database.Comment({
      text,
      user_id,
      product_id
    })
      .save()
      .then(comment => {
        return res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });

module.exports = router;