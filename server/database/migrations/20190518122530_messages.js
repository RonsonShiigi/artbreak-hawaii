exports.up = function(knex, Promise) {
  return knex.schema.createTable("messages", table => {
    table.increments();
    table.string("subject");
    table.string("text");
    table.integer("sent_to");
    table.integer("from");
    table.timestamp("created_at").defaultTo(knex.raw("now()"));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("messages");
};
