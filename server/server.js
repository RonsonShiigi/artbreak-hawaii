const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);

const PORT = process.env.PORT;
const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME;
const SESSION_SECRET = process.env.SESSION_SECRET;

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

const app = express();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
