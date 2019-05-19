const express = require("express");
const router = express.Router();

router
  .route("/")
  .get((req, res) => {
    return new req.database.User()
      .fetchAll()
      .then(users => {
        return res.json(users);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  })
  .post((req, res) => {
    console.log("hitting");
    const user_ID = req.body.id;
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const first_name = req.body.first_name;
    const last_name = req.body.first_name;
    const created_at = req.body.created_at;
    const updated_at = req.body.updated_at;
    console.log("post", req.body);
    return new req.database.User({
      user_ID,
      username,
      password,
      email,
      first_name,
      last_name,
      created_at,
      updated_at
    })
      .save()
      .then(user => {
        return res.json({ success: true });
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  });

module.exports = router;
