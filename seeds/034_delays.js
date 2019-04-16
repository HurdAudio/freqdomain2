'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('delays').del()
    .then(function () {
      // Inserts seed entries
      return knex('delays').insert([
        {
          id: 1,
          user_id: 1,
          name: 'delay',
          delay: 0.500,
          delay_modulator: null,
          input: null,
          output: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('delays_id_seq', (SELECT MAX(id) FROM delays));");
    });
};
