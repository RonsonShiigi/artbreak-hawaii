const bookshelf = require("../bookshelf");

class Like extends bookshelf.Model {
  get tableName() {
    return "likes";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Like", Like);
