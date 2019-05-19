const bookshelf = require("../bookshelf");

class Comment extends bookshelf.Model {
  get tableName() {
    return "comments";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Comment", Comment);
