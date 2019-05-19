exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("table_name")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("table_name").insert([
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
