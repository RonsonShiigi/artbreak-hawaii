exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("messages")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("messages").insert([
        {
          subject: "Please Marry Me",
          text: "I saw you...please marry me",
          sent_to: 1,
          from: 2
        }
      ]);
    });
};
