exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", table => {
    table.increments();
    table.string("text").notNullable();
    table.integer("user_id");
    table.timestamp("created_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
