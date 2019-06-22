exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("products")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("products").insert([
        {
          title: "d",
          description: "Sam's Cool Meme",
          image_url: "https://i.imgur.com/CC4EFLz.jpg",
          user_id: 1
        },
        {
          title: "Ho Bags",
          description: "Sam's Cool Sexy Couple",
          image_url: "https://i.imgur.com/4kSDdjn.jpg",
          user_id: 1
        },
        {
          title: "Low-Effort Meme Team",
          description: "The ho bags, but cuter",
          image_url: "https://i.imgur.com/k6uPXOc.png",
          user_id: 4
        },
        {
          title: "Spooky Hair Witch",
          description: "She got hair. She a witch",
          image_url: "https://i.imgur.com/btz6oKK.png",
          user_id: 4
        },
        {
          title: "My Dumb Baby",
          description: "The best girl in the world",
          image_url: "https://i.imgur.com/C0EA6N5.jpg",
          user_id: 1
        },
        {
          title: "*breathes* BOI",
          description: "I don't draw men, just manlier women",
          image_url: "https://i.imgur.com/Tn07oSS.png",
          user_id: 1
        }
      ]);
    });
};
