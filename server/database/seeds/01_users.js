exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "samszys",
          email: "juntillaaaaa@hawaii.edu",
          password: "fart",
          first_name: "Sam",
          last_name: "Juntilla"
        },
        {
          username: "cptMarvel",
          email: "captain@gmail.com",
          password: "fart",
          first_name: "Captain",
          last_name: "Marvel"
        },
        {
          username: "j10",
          email: "j10@hawaii.edu",
          password: "fart",
          first_name: "Justen",
          last_name: "Nakamoto"
        },
        {
          username: "turtleWayne",
          email: "turutleWayne@gmail.com",
          password: "fart",
          first_name: "Turtle",
          last_name: "Wayne"
        }
      ]);
    });
};
