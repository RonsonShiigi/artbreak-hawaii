const express = require("express");
const router = express.Router();
const Like = require("../../models/LikesModel.js");

router
  .route("/")

  // RENDER LIKE
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

  // CREATE LIKE
  .post((req, res) => {
    console.log("hitting");

    const product_id = req.body.product_id;
    const user_id = req.body.user_id;

    console.log("post", req.body);
    return new req.database.Like({
      product_id,
      user_id
    })
      .save()
      .then(like => {
        return res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });

// EDIT LIKE
router.put("/:id", (req, res) => {
  const body = req.body;
  const paramsId = req.params.id;

  Like.where({
    id: paramsId
  })
    .fetch()
    .then(like => {
      new Like({
        id: paramsId
      })
        .save(
          {
            product_id: req.body.product_id,
            user_id: req.body.user_id
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

// DELETE LIKE
router.delete("/:id", (req, res) => {
  const paramsId = req.params.id;

  Like.where({
    id: paramsId
  })
    .fetch()
    .then(like => {
      new Like({
        id: paramsId
      })
        .destroy()
        .then(() => {
          return res.redirect("/");
        });
    });
});

module.exports = router;
