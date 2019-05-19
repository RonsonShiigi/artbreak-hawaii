const User = require("./models/UsersModel");
const Product = require("./models/ProductsModel");
const Comment = require("./models/CommentsModel");
const Like = require("./models/LikesModel");
const Message = require("./models/MessagesModel");
const Purchase = require("./models/PurchasesModel");

module.exports = function(req, res, next) {
  req.database = { User, Product, Comment, Like, Message, Purchase };
  next();
};
