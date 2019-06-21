exports.up = function(knex, Promise) {
  return knex.schema
    .createTable("invoices", table => {
      table.increments("id").primary();
      table.integer("user_id").unsigned();
      table
        .foreign("user_id")
        .references("users.id")
        .onDelete("cascade");
      table.string("description");
      table.decimal("price");
      table.string("buyerEmail");
      table.boolean("paid");
      table.string("token");
      table.string("charge_id");
      table.boolean("refund");
      table.decimal("refund_available");
      table.timestamp("created_at").defaultTo(knex.raw("now()"));
      table.timestamp("purchased_at");
    })
    .then(function() {
      knex.schema.createTable("refunds", table => {
        table.increments("id").primary();
        table.integer("invoice_id").unsigned();
        table
          .foreign("invoice_id")
          .references("invoices.id")
          .onDelete("cascade");
        table.integer("user_id").unsigned();
        table
          .foreign("user_id")
          .references("users.id")
          .onDelete("cascade");
        table.string("refund_id");
        table.decimal("amount");
        table.timestamp("created_at").defaultTo(knex.raw("now()"));
      });
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("invoices");
};
