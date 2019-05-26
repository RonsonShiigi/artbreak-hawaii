exports.up = function(knex, Promise) {
  return knex.schema.createTable("shoppingcart", table => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("description");
    table.string("image_url");
    table.integer("user_id");
    table.decimal("price");
    table.integer("seller_id");
    table.timestamp("created_at").defaultTo(knex.raw("now()"));
    table.timestamp("updated_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("shoppingcart");
};
