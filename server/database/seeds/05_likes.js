exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("likes")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("likes").insert([
        {
          product_id: 1,
          user_id: 2
        }
      ]);
    });
};
