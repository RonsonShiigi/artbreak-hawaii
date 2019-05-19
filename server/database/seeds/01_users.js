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
        }
      ]);
    });
};
