'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('oscillators').del()
    .then(function () {
      // Inserts seed entries
      return knex('oscillators').insert([
        {
          id: 1,
          user_id: 1,
          name: 'oscillator',
          positionX: 700,
          positionY: 200,
          waveform: 'sine',
          waveform_modulator: null,
          hertz: 440.000,
          hertz_modulator: null,
          detune: 0.00,
          detune_modulator: null,
          output: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('oscillators_id_seq', (SELECT MAX(id) FROM oscillators));");
    });
};
