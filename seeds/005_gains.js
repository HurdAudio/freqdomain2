'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gains').del()
    .then(function () {
      // Inserts seed entries
      return knex('gains').insert([
        {
          id: 1,
          user_id: 1,
          name: 'gain',
          positionX: 1000,
          positionY: 400,
          gain_value: 40,
          gain_modulator: null,
          input: null,
          output: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('gains_id_seq', (SELECT MAX(id) FROM gains));");
    });
};
