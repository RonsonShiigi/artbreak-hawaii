exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("products", table => {
      table.increments();
      table.string("title").notNullable();
      table.string("description");
      table.string("image_url");
      table.integer("user_id").unsigned();
      table.foreign("user_id").references("users.id");
      table.timestamp("created_at").defaultTo(knex.raw("now()"));
      table.timestamp("updated_at");
    })
    .then(function() {
      return knex.schema.createTable("likes", table => {
        table.increments();
        table.integer("product_id").unsigned();
        table.foreign("product_id").references("products.id");
        table.integer("user_id").unsigned();
        table.foreign("user_id").references("users.id");
      });
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("likes").dropTable("products");
};
