const express = require("express");
const router = express.Router();
const Message = require("../../models/MessagesModel.js");

router
  .route("/")

  // RENDER MESSAGE
  .get((req, res) => {
    return new req.database.Message()
      .fetchAll()
      .then(messages => {
        return res.json(messages);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })

  // CREATE MESSAGE
  .post((req, res) => {
    const subject = req.body.subject;
    const text = req.body.text;
    const sent_to = req.body.sent_to;
    const from = req.body.from;

    return new req.database.Message({
      subject,
      text,
      sent_to,
      from
    })
      .save()
      .then(message => {
        return res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });

// EDIT MESSAGE
router.put("/:id", (req, res) => {
  const body = req.body;
  const paramsId = req.params.id;

  Message.where({
    id: paramsId
  })
    .fetch()
    .then(message => {
      new Message({
        id: paramsId
      })
        .save(
          {
            subject: req.body.subject,
            text: req.body.text,
            sent_to: req.body.sent_to,
            from: req.body.from
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

// DELETE MESSAGE
router.delete("/:id", (req, res) => {
  const paramsId = req.params.id;

  Message.where({
    id: paramsId
  })
    .fetch()
    .then(message => {
      new Message({
        id: paramsId
      })
        .destroy()
        .then(() => {
          return res.redirect("/");
        });
    });
});

module.exports = router;
