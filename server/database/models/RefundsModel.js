const bookshelf = require("../bookshelf");

class Refunds extends bookshelf.Model {
  get tableName() {
    return "refunds";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Refunds", Refunds);
