const bookshelf = require("../bookshelf");

class Products extends bookshelf.Model {
  get tableName() {
    return "products";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Products", Products);
