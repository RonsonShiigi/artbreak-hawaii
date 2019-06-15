const bookshelf = require("../bookshelf");
class Invoice extends bookshelf.Model {
  get tableName() {
    return "invoices";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Invoice", Invoice);
