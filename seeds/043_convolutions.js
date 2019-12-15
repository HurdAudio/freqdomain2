'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('convolutions').del()
    .then(function () {
      // Inserts seed entries
      return knex('convolutions').insert([
        {
          id: 1,
          user_id: 1,
          impulse: 1,
          name: 'convolution',
          normalize: false,
          input: null,
          output: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('convolutions_id_seq', (SELECT MAX(id) FROM convolutions));");
    });
};
