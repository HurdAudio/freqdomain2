'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('notch_filters').del()
    .then(function () {
      // Inserts seed entries
      return knex('notch_filters').insert([
        {
          id: 1,
          user_id: 1,
          name: 'notch filter',
          frequency: 110.000,
          frequency_modulator: null,
          detune: 0.00,
          detune_modulator: null,
          q: 0.0000,
          q_modulator: null,
          input: null,
          output: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('notch_filters_id_seq', (SELECT MAX(id) FROM notch_filters));");
    });
};
