const express = require("express");
const router = express.Router();
const Comment = require("../../models/CommentsModel.js");

router
  .route("/")

  // RENDER COMMENT
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

  // CREATE COMMENT
  .post((req, res) => {
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

// EDIT COMMENT
router.put("/:id", (req, res) => {
  const body = req.body;
  const paramsId = req.params.id;

  Comment.where({
    id: paramsId
  })
    .fetch()
    .then(comment => {
      new Comment({
        id: paramsId
      })
        .save(
          {
            subject: req.body.subject,
            text: req.body.text,
            sent_to: req.body.sent_to,
            from: req.body.from,
            updated_at: new Date()
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

// DELETE COMMENT
router.delete("/:id", (req, res) => {
  const paramsId = req.params.id;

  Comment.where({
    id: paramsId
  })
    .fetch()
    .then(comment => {
      new Comment({
        id: paramsId
      })
        .destroy()
        .then(() => {
          return res.redirect("/");
        });
    });
});

module.exports = router;
