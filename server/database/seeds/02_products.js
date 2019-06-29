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
          username: "samszys"
        },
        {
          title: "High Effort Meme",
          description: "Sam's Cool Sexy Couple",
          image_url: "https://i.imgur.com/4kSDdjn.jpg",
          user_id: 1,
          username: "samszys"
        },
        {
          title: "Low-Effort Meme Team",
          description: "The high effort meme, but cuter",
          image_url: "https://i.imgur.com/k6uPXOc.png",
          user_id: 4,
          username: "sam, but better"
        },
        {
          title: "Spooky Hair Witch",
          description: "She got hair. She a witch",
          image_url: "https://i.imgur.com/btz6oKK.png",
          user_id: 4,
          username: "sam, but better"
        },
        {
          title: "My Dumb Baby",
          description: "The best girl in the world",
          image_url: "https://i.imgur.com/C0EA6N5.jpg",
          user_id: 1,
          username: "samszys"
        },
        {
          title: "Bug Knights",
          description: "These are bug knights",
          image_url:
            "https://artbreakjeh.s3-us-west-2.amazonaws.com/1561763151575.jpg",
          user_id: 3,
          username: "j10"
        },
        {
          title: "Ninja Boy",
          description: "This is a ninja boy",
          image_url:
            "https://artbreakjeh.s3-us-west-2.amazonaws.com/1561746485889.jpg",
          user_id: 3,
          username: "j10"
        },
        {
          title: "Big Boy",
          description: "This is a big boy",
          image_url:
            "https://artbreakjeh.s3-us-west-2.amazonaws.com/1561746388399.jpg",
          user_id: 3,
          username: "j10"
        },
        {
          title: "Black Rhino",
          description: "This is a black rhino",
          image_url:
            "https://artbreakjeh.s3-us-west-2.amazonaws.com/1561746302558.jpg",
          user_id: 3,
          username: "j10"
        },
        {
          title: "Space Invader",
          description: "This is space invader",
          image_url:
            "https://artbreakjeh.s3-us-west-2.amazonaws.com/1561746618909.jpg",
          user_id: 3,
          username: "j10"
        },
        {
          title: "Bruce Lee",
          description: "This is Bruce Lee",
          image_url: "https://artbreakjeh.s3-us-west-2.amazonaws.com/bruce.PNG",
          user_id: 3,
          username: "j10"
        },
        {
          title: "DH",
          description: "Diamond Head",
          image_url:
            "https://artbreakjeh.s3-us-west-2.amazonaws.com/IMG_0895.jpg",
          user_id: 3,
          username: "j10"
        },
        {
          title: "Ocean Feels",
          description: "Ocean feels good",
          image_url:
            "https://artbreakjeh.s3-us-west-2.amazonaws.com/IMG_0892+(1).jpg",
          user_id: 3,
          username: "j10"
        }
      ]);
    });
};
