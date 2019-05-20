const bookshelf = require("../bookshelf");

class Message extends bookshelf.Model {
  get tableName() {
    return "messages";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Message", Message);
