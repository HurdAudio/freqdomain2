'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('test_tones').del()
    .then(function () {
      // Inserts seed entries
      return knex('test_tones').insert([
        {
          id: 1,
          user_id: 1,
          name: 'test tone',
          gain_value: 40,
          waveform: 'sine',
          hertz: 440.000,
          device_on: false,
          output: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('test_tones_id_seq', (SELECT MAX(id) FROM test_tones));");
    });
};
