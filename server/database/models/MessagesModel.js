const bookshelf = require("../bookshelf");

class Messages extends bookshelf.Model {
  get tableName() {
    return "messages";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Messages", Messages);
