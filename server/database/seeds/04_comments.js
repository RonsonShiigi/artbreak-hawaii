exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("comments")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("comments").insert([
        { text: "This is amazing work", user_id: 2, product_id: 2 },
        { text: "Fire Fire Fire", user_id: 1, product_id: 3 },
        { text: "Chee hoo great job!", user_id: 2, product_id: 1 },
        { text: "Well Done", user_id: 4, product_id: 1 },
        { text: "Great Job", user_id: 2, product_id: 1 },
        { text: "So Stoked", user_id: 2, product_id: 3 }
      ]);
    });
};
