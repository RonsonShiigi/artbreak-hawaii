exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "samszys",
          email: "juntilla@hawaii.edu",
          password: "fart",
          stripe_id: "acct_1Eg5XkEWUMHDF9ZA",
          profileblurb: "i like bread"
        },
        {
          username: "cptMarvel",
          email: "captain@gmail.com",
          password: "fart",
          stripe_id: "acct_1Eg5XkEWUMHDF9ZA",
          profileblurb: "i like bread"
        },
        {
          username: "j10",
          email: "j10@hawaii.edu",
          password: "fart",
          stripe_id: "acct_1Eg5U4EKjXIa5sbE",
          profileblurb: "i like bread"
        },
        {
          username: "sam, but better",
          email: "sams@gmail.com",
          password: "fart",
          stripe_id: "acct_1Eg5TDHI3KTEQBIB",
          profileblurb: "i REALLY like bread"
        }
      ]);
    });
};
