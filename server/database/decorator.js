const Users = require("./models/UsersModel");
const Products = require("./models/ProductsModel");
const Comments = require("./models/CommentsModel");
const Likes = require("./models/LikesModel");
const Messages = require("./models/MessagesModel");
const Purchased = require("./models/PurchasedModel");

module.exports = function(req, res, next) {
  req.database = { Users, Products, Comments, Likes, Messages, Purchased };
  next();
};
