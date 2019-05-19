const express = require("express");
const router = express.Router();

router
  .route("/")
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
  .post((req, res) => {
    console.log("hitting");
    const message_id = req.body.id;
    const subject = req.body.subject;
    const text = req.body.text;
    const sent_to = req.body.sent_to;
    const from = req.body.from;
    const created_at = req.body.created_at;

    console.log("post", req.body);
    return new req.database.Message({
      message_id,
      subject,
      text,
      sent_to,
      from,
      created_at
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

module.exports = router;
