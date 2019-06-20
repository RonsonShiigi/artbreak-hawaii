const express = require("express");
const router = express.Router();
const User = require("../../models/UsersModel.js");

router
  .route("/")

  // RENDER USER
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

  // CREATE USER
  .post((req, res) => {
    const body = req.body;

    new req.database.User({});
    return new req.database.User({
      body
    })
      .save()
      .then(user => {
        return res.json({ success: true });
      })
      .catch(err => {
        res.sendStatus(500);
      });
  });

// EDIT USER
router.post("/:id", (req, res) => {
  const body = req.body;
  const paramsId = req.params.id;
  console.log(body);
  User.where({
    id: paramsId
  })
    .fetch()
    .then(user => {
      new User({
        id: paramsId
      })
        .save(
          {
            profileblurb: body.profileblurb,
            avatarurl: body.avatarurl,
            contactlinks: body.contactlinks
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

// DELETE USER
router.delete("/:id", (req, res) => {
  const paramsId = req.params.id;

  User.where({
    id: paramsId
  })
    .fetch()
    .then(user => {
      new User({
        id: paramsId
      })
        .destroy()
        .then(() => {
          return res.redirect("/");
        });
    });
});

// GET SPECIFIC USER
router.get("/:id", (req, res) => {
  const paramsID = req.params.id;
  User.where({
    id: paramsID
  })
    .fetch()
    .then(user => {
      const userData = user.toJSON();
      const userDataObj = {
        user_id: userData.id,
        username: userData.username,
        email: userData.email,
        profileblurb: userData.profileblurb,
        avatarurl: userData.avatarurl,
        stripeSignUp: userData.stripe_signup,
        created_at: userData.created_at
      };
      console.log("USERDATA", userDataObj);
      return res.json(userDataObj);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;
