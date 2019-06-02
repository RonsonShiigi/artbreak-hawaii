const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  console.log("req Params after Stripe Redirect", res.body);
});

module.exports = router;
