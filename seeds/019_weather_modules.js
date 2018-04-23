'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('weather_modules').del()
    .then(function () {
      // Inserts seed entries
      return knex('weather_modules').insert([
        {
          id: 1,
          user_id: 1,
          name: 'weather module',
          zip_code_toggle: true,
          zip_digit_1: 6,
          zip_digit_1_modulator: null,
          zip_digit_2: 0,
          zip_digit_2_modulator: null,
          zip_digit_3: 6,
          zip_digit_3_modulator: null,
          zip_digit_4: 4,
          zip_digit_4_modulator: null,
          zip_digit_5: 7,
          zip_digit_5_modulator: null,
          country: '',
          city: '',
          output: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('weather_modules_id_seq', (SELECT MAX(id) FROM weather_modules));");
    });
};
