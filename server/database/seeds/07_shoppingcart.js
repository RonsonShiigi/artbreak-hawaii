exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("shoppingcart")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("shoppingcart").insert([
        {
          title: "Turtle Tinder",
          description: "Tinder for Turtles",
          image_url:
            "https://66.media.tumblr.com/4a009c5a1ab2ce75f795d8c3b3ec4a00/tumblr_nwj96rihEP1qz9v0to4_640.jpg",
          user_id: 4,
          price: 10.0,
          seller_id: 2
        },
        {
          title: "Turtles in Snake Farting Like Crazy",
          description: "Turtles in Snake",
          image_url:
            "https://i.pinimg.com/originals/75/de/e9/75dee965859cee00acde21420aafcd15.jpg",
          user_id: 4,
          price: 10.0,
          seller_id: 2
        },
        {
          title: "Test tickles",
          description: "Elmo",
          image_url:
            "https://i.pinimg.com/originals/75/de/e9/75dee965859cee00acde21420aafcd15.jpg",
          user_id: 4,
          price: 20.0,
          seller_id: 3
        },
        {
          title: "Key Caps",
          description: "Key capssssss",
          image_url:
            "https://i.pinimg.com/originals/75/de/e9/75dee965859cee00acde21420aafcd15.jpg",
          user_id: 4,
          price: 30.0,
          seller_id: 3
        }
      ]);
    });
};
