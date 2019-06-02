const express = require("express");
const bodyParser = require("body-parser");
const decorator = require("./database/decorator");
const cors = require("cors");

//authorization variables
const passport = require("passport");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const PORT = process.env.PORT || 8080;
const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME;
const SESSION_SECRET = process.env.SESSION_SECRET;

//routes
const UserRoutes = require("./database/routes/users/index");
const ProductRoutes = require("./database/routes/products/index");
const CommentRoutes = require("./database/routes/comments/index");
const PurchaseRoutes = require("./database/routes/purchases/index");
const MessageRoutes = require("./database/routes/messages/index");
const LikeRoutes = require("./database/routes/likes/index");
const AuthRoutes = require("./database/routes/auth/index");
const ShoppingCartRoutes = require("./database/routes/shoppingcart/index.js");
const TestRoute = require("./database/routes/newProduct/index");
// const profileRoutes = require("./database/routes/profile/index");

if (!PORT) {
  console.log("No Port Found");
}

if (!SESSION_SECRET) {
  console.log("No Session Secret Found!");
}
if (!REDIS_HOSTNAME) {
  console.log("No Redis Hostname Found!");
}

if (!PORT || !SESSION_SECRET || !REDIS_HOSTNAME) {
  return process.exit(1);
}

//setup middleware
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//decorate
app.use(decorator);

//authorization middleware
app.use(
  session({
    store: new RedisStore({
      host: "localhost",
      port: 6379,
      url: process.env.REDIS_HOSTNAME
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

//cors issue
app.use(cors({ credentials: true, origin: "http://localhost:8081" }));

//routing
// app.use("/profile", profileRoutes);
app.use("/users", UserRoutes);
app.use("/products", ProductRoutes);
app.use("/comments", CommentRoutes);
app.use("/purchases", PurchaseRoutes);
app.use("/messages", MessageRoutes);
app.use("/likes", LikeRoutes);
app.use("/api", AuthRoutes);
app.use("/cart", ShoppingCartRoutes);
app.use("/newProduct", TestRoute);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
