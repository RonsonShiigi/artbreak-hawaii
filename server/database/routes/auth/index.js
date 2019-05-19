const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local");

const Users = require("../../models/UsersModel");

passport.serializeUser((user, done) => {
  console.log("serializeUser", user);
  done(null, {
    email: user.email,
    zomg: "randomData"
  });
});

passport.deserializeUser((user, done) => {
  console.log("desrializing User", user);
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
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    console.log("emailddddd", email);
    console.log("lcoal is being called");
    Users.where({ email })
      .fetch()
      .then(user => {
        user = user.toJSON();
        console.log("Uzer", user);
        // if (user.password === password) {
        //   done(null, user);
        // } else {
        //   done(null, false);
        // }
        bcrypt.compare(password, user.password).then(res => {
          if (res) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      })
      .catch(err => {
        done(null, false);
      });
  })
);

//hello world
router.get("/auth/register", (req, res) => {
  console.log(req);
  res.send("hi");
  //   res.render("register");
});

const SALT_ROUNT = 12;
router.post("/auth/register", (req, res) => {
  const { username, email, first_name, last_name, password } = req.body;
  console.log("body", req.body);

  bcrypt
    .genSalt(12)
    .then(salt => {
      console.log("salt", salt);
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      console.log("hash", hash);
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
      res.redirect("/"); //Never send entire user obj to user
      //res.sendStatus(200)
      //res.redirect('/api/auth/secret')
    })
    .catch(err => {
      console.log("err", err);
      res.json(err);
    });
});

router.post(
  "/auth/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    const email = req.body.email;
    // Users.where({ email });
    req.session.user = req.body;
    let user = req.body;
    console.log("sesshan", req.session);
    Users.where({ email })
      .fetch()
      .then(user => {});
    req.logIn(user, err => {
      if (err) {
        return next(err);
      } else {
        console.log("sdfads");
      }
    });
    console.log(
      "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&You Have Succesfully Logged In"
    );
    res.redirect("/");
    //grab the user on record
    //compare req.body.password to password on record
  }
);

router.post("/auth/logout", (req, res) => {
  req.logout();
  console.log("loggingOff");
  res.redirect("/");
});

function isAuthenticated(req, res, done) {
  if (req.isAuthenticated()) {
    done();
  } else {
    res.redirect("/");
  }
}

module.exports = router;
