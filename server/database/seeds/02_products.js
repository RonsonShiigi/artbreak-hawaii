exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert([
        {
          title: "Meme Machine",
          description: "Sam's Cool Meme",
          image_url: "https://i.imgur.com/CC4EFLz.jpg",
          user_id: 1,
          price: 10.0
        },
        {
          title: "Ho Bags",
          description: "Sam's Cool Sexy Couple",
          image_url: "https://i.imgur.com/4kSDdjn.jpg",
          user_id: 1,
          price: 10.0
        },
        {
          title: "Turtle Tinder",
          description: "Tinder for Turtles",
          image_url:
            "https://66.media.tumblr.com/4a009c5a1ab2ce75f795d8c3b3ec4a00/tumblr_nwj96rihEP1qz9v0to4_640.jpg",
          user_id: 4,
          price: 10.0
        },
        {
          title: "Turtles in Snake Farting Like Crazy",
          description: "Turtles in Snake",
          image_url:
            "https://i.pinimg.com/originals/75/de/e9/75dee965859cee00acde21420aafcd15.jpg",
          user_id: 4,
          price: 10.0
        }
      ]);
    });
};
