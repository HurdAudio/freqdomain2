'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('dynamic_compressors').del()
    .then(function () {
      // Inserts seed entries
      return knex('dynamic_compressors').insert([
        {
          id: 1,
          user_id: 1,
          name: 'dynamic compressor',
          threshold: -24.00,
          knee: 30.00,
          ratio: 12.000,
          attack: 0.003,
          release: 0.250,
          input: null,
          output: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('dynamic_compressors_id_seq', (SELECT MAX(id) FROM dynamic_compressors));");
    });
};
