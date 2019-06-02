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
        // if (user.password === password) {
        //   done(null, user);
        // } else {
        //   done(null, false);
        // }
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

//hello world
// router.get("/auth/register", (req, res) => {
//   console.log(req);
//   res.send("hi");
//   //   res.render("register");
// });

const SALT_ROUNT = 12;
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

      res.send(user);
      // res.redirect("/"); //Never send entire user obj to user
      //res.sendStatus(200)
      //res.redirect('/api/auth/secret')
    })
    .catch(err => {
      res.json(err);
    });
});

router.post(
  "/auth/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    const email = req.body.email;
    // Users.where({ email });
    // let user = req.body;

    Users.where({ email })
      .fetch()
      .then(user => {
        user = user.toJSON();
        const userData = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username
        };
        req.session.user = req.body;
        // req.logIn(user, err => {
        //   if (err) {
        //     return next(err);
        //   } else {

        //     res.json(userData);
        //   }
        // });
        console.log("Session user", req.session.user);
      })
      .catch(err => {
        console.log("err", err);
        res.sendStatus(500);
      });

    res.send("AUTH");
    // res.redirect("/");
    //grab the user on record
    //compare req.body.password to password on record
  }
);

// router.post("/auth/logout", (req, res) => {
//   req.logout();
//   res.redirect("/");
// });

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
  // res.redirect("/");
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
