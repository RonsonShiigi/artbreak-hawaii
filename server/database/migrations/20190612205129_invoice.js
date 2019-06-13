exports.up = function(knex, Promise) {
  return knex.schema.createTable("invoices", table => {
    table.increments("id").primary();
    table.integer("user_id");
    table.string("description");
    table.decimal("price");
    table.string("buyerEmail");
    table.boolean("paid").defaultTo("false");
    table.string("token");
    table.timestamp("created_at").defaultTo(knex.raw("now()"));
    table.timestamp("purchased_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("invoices");
};
