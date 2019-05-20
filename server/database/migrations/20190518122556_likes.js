exports.up = function(knex, Promise) {
  return knex.schema.createTable("likes", table => {
    table.increments();
    table.integer("product_id");
    table.integer("user_id");
    table.timestamp("created_at").defaultTo(knex.raw("now()"));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("likes");
};
