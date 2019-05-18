const bookshelf = require("../bookshelf");

class Likes extends bookshelf.Model {
  get tableName() {
    return "likes";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Likes", Likes);
