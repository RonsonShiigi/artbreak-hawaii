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
        },
        {
          product_id: 2,
          user_id: 3,
          price: 10.0,
          tax: 3.0,
          confirmation_number: "3Z2342982K2EK"
        },
        {
          product_id: 3,
          user_id: 2,
          price: 10.0,
          tax: 3.0,
          confirmation_number: "3ZDFDFW982K2EK"
        },
        {
          product_id: 1,
          user_id: 4,
          price: 10.0,
          tax: 3.0,
          confirmation_number: "7DKJFDFW982K2EK"
        }
      ]);
    });
};
