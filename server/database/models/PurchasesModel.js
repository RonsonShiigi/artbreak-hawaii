const bookshelf = require("../bookshelf");

class Purchase extends bookshelf.Model {
  get tableName() {
    return "purchases";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Purchase", Purchase);
