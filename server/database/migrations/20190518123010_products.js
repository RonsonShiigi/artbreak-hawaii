exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("products", table => {
      table.increments();
      table.string("title").notNullable();
      table.string("description");
      table.string("image_url");
      table.integer("user_id").unsigned();
      table
        .foreign("user_id")
        .references("users.id")
        .onDelete("cascade");
      table.string("username").unsigned();
      table
        .foreign("username")
        .references("users.username")
        .onDelete("cascade");
      table.timestamp("created_at").defaultTo(knex.raw("now()"));
      table.timestamp("updated_at");
    })
    .then(function() {
      return knex.schema
        .createTable("likes", table => {
          table.increments();
          table.integer("product_id").unsigned();
          table
            .foreign("product_id")
            .references("products.id")
            .onDelete("cascade");
          table.integer("user_id").unsigned();
          table
            .foreign("user_id")
            .references("users.id")
            .onDelete("cascade");
        })
        .then(function() {
          return knex.schema.createTable("purchases", table => {
            table.increments();
            table.integer("user_id").unsigned();
            table
              .foreign("user_id")
              .references("users.id")
              .onDelete("cascade");
            table.integer("product_id").unsigned();
            table
              .foreign("product_id")
              .references("id")
              .inTable("products")
              .onDelete("cascade");
            table.timestamp("purchased_at").defaultTo(knex.raw("now()"));
            table.decimal("price");
            table.decimal("tax");
            table.string("confirmation_number");
          });
        });
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable("likes")
    .dropTable("purchases")
    .dropTable("products");
};
