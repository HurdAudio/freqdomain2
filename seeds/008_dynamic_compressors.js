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
          positionX: 400,
          positionY: 200,
          threshold: -24.00,
          threshold_modulator: null,
          knee: 30.00,
          knee_modulator: null,
          ratio: 12.000,
          ratio_modulator: null,
          attack: 0.003,
          attack_modulator: null,
          release: 0.250,
          release_modulator: null,
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
