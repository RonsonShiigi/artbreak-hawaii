const bookshelf = require("../bookshelf");

class Users extends bookshelf.Model {
  get tableName() {
    return "users";
  }
  get hasTimestamps() {
    return false;
  }
}

module.exports = bookshelf.model("Users", Users);
