exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("purchases")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("purchases").insert([
        {
          product_id: 1,
          user_id: 2,
          price: 10.0,
          tax: 3.0,
          confirmation_number: "3ZKFMVW982K2EK"
        }
      ]);
    });
};
