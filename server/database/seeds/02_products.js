exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("table_name").insert([
        {
          title: "Meme Machine",
          description: "Sam's Cool Meme",
          image_url: "https://i.imgur.com/CC4EFLz.jpg",
          user_id: 1,
          price: 10.0
        }
      ]);
    });
};
