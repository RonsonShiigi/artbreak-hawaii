const bookshelf = require("../bookshelf");

class ShoppingCart extends bookshelf.Model {
  get tableName() {
    return "shoppingcart";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("ShoppingCart", ShoppingCart);
