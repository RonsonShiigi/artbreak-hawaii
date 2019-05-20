exports.up = function(knex, Promise) {
  return knex.schema.createTable("purchases", table => {
    table.increments();
    table.integer("product_id");
    table.integer("user_id");
    table.timestamp("purchased_at").defaultTo(knex.raw("now()"));
    table.decimal("price");
    table.decimal("tax");
    table.string("confirmation_number");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("purchases");
};
