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
    const subject = req.body.subject;
    const text = req.body.text;
    const sent_to = req.body.sent_to;
    const from = req.body.from;
    console.log("post", req.body);
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

module.exports = router;
