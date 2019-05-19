exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table
      .string("username")
      .unique()
      .notNullable();
    table
      .string("email")
      .unique()
      .notNullable();
    table.string("password").notNullable();
    table.string("first_name");
    table.string("last_name");
    table.datetime("created_at").defaultTo(knex.raw("now()"));
    table.datetime("modified_at");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
