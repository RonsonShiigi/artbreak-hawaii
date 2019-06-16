exports.up = function(knex, Promise) {
  return knex.schema.createTable("products", table => {
    table.increments();
    table.string("title").notNullable();
    table.string("description");
    table.string("image_url");
    table.integer("user_id");
    table.timestamp("created_at").defaultTo(knex.raw("now()"));
    table.timestamp("updated_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("products");
};
