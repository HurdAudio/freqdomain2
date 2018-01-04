'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('random_number_generators').del()
    .then(function () {
      // Inserts seed entries
      return knex('random_number_generators').insert([
        {
          id: 1,
          user_id: 1,
          name: 'random number generator',
          interval: 1,
          interval_modulator: null,
          maximum: 0.000,
          maximum_modulator: null,
          minimum: 0.000,
          minimum_modulator: null,
          continuous: false,
          exponential: false,
          convex: false,
          slope: 4,
          output: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('random_number_generators_id_seq', (SELECT MAX(id) FROM random_number_generators));");
    });
};
