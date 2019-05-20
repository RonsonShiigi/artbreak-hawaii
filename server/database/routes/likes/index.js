const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    return new req.database.Like()
      .fetchAll()
      .then(likes => {
        return res.json(likes);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })
  .post((req, res) => {
    console.log("hitting");
    const product_id = req.body.product_id;
    const user_id = req.body.user_id;
    console.log("post", req.body);
    return new req.database.Like({ product_id, user_id })
      .save()
      .then(like => {
        return res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });

module.exports = router;
