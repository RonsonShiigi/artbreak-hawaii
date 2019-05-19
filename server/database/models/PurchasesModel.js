const bookshelf = require("../bookshelf");

class Purchased extends bookshelf.Model {
  get tableName() {
    return "purchases";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Purchased", Purchased);
