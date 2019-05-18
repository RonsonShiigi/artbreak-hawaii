const bookshelf = require("../bookshelf");

class Comments extends bookshelf.Model {
  get tableName() {
    return "comments";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Comments", Comments);
