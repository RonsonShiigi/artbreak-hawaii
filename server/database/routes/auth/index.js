const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const Users = require("../../models/UsersModel");

passport.serializeUser((user, done) => {
  "serializeUser", user;
  done(null, {
    email: user.email,
    zomg: "randomData"
  });
});

passport.deserializeUser((user, done) => {
  Users.where({ email: user.email })
    .fetch()
    .then(user => {
      user = user.toJSON();
      done(null, user);
    })
    .catch(err => {
      console.log("err", err);
    });
});

passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    Users.where({ email })
      .fetch()
      .then(user => {
        user = user.toJSON();
        bcrypt
          .compare(password, user.password)
          .then(res => {
            if (res) {
              done(null, user);
            } else {
              done(null, false);
            }
          })
          .catch(err => {
            console.log("bcrypt err", err);
          });
      })
      .catch(err => {
        console.log("auth ERRR", err);
        done(null, false);
      });
  })
);

const SALT_ROUND = 12;
router.post("/auth/register", (req, res) => {
  const { username, email, first_name, last_name, password } = req.body;

  bcrypt
    .genSalt(12)
    .then(salt => {
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      return Users.forge({
        username,
        email,
        first_name,
        last_name,
        password: hash
      }).save();
    })
    .then(user => {
      user = user.toJSON();
    })
    .catch(err => {
      console.log("ERROR", err.detail);
      res.send(err);
    });
});

router.post("/auth/register/check", (req, res) => {
  let userUsername = req.body.username;
  let userQuery = { email: "", username: "" };
  Users.where({ email: req.body.email })
    .fetchAll()
    .then(user => {
      const userEmail = user.toJSON();
      if (!userEmail[0]) {
        userQuery.email = "";
      } else {
        const userData = userEmail[0].email;
        userQuery.email = userData;
      }
    })
    .then(() => {
      Users.where({ username: userUsername })
        .fetchAll()
        .then(username => {
          const userName = username.toJSON();
          if (!userName[0]) {
            userQuery.username = "";
          } else {
            const usernameData = userName[0].username;
            userQuery.username = usernameData;
          }
        })
        .then(() => {
          return res.json(userQuery);
        })
        .catch(err => {
          console.log("Error", err);
          res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log("ERR", err);
      res.sendStatus(500);
    });
});

router.post(
  "/auth/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    const email = req.body.email;
    let userData;

    Users.where({ email })
      .fetch()
      .then(user => {
        user = user.toJSON();
        userData = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username
        };
        req.session.user = req.body;
        return res.json(userData);
      })
      .catch(err => {
        console.log("err", err);
        res.sendStatus(500);
      });
  }
);

router.post("/auth/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return next(err);
      } else {
        console.log("after", req.session);
      }
    });
  }
  res.json("success");
});

function isAuthenticated(req, res, done) {
  if (req.isAuthenticated()) {
    done();
  } else {
    console.log("req is Auth", req.isAuthenticated());
    res.redirect("/");
  }
}

router.get("/secret", isAuthenticated, (req, res) => {
  console.log("secret authed!");
  res.send("YOU ARE AUTHENTICATED!!!");
});

module.exports = router;
