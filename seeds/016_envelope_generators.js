'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('envelope_generators').del()
    .then(function () {
      // Inserts seed entries
      return knex('envelope_generators').insert([
        {
          id: 1,
          user_id: 1,
          name: 'envelope generator',
          attack_start: 0.00,
          attack_start_modulator: null,
          attack_time_interval: 1,
          attack_time_interval_modulator: null,
          attack_end: 100.00,
          attack_end_modulator: null,
          attack_exponential: false,
          attack_convex: false,
          attack_slope: 4,
          decay_on: true,
          decays: {
            "decays": [
              {
                "decay_time_interval": 1,
                "decay_time_interval_modulator": null,
                "decay_end": 80.00,
                "decay_end_modulator": null,
                "decay_exponential": false,
                "decay_convex": false,
                "decay_slope": 4
              }
            ]
          },
          sustain_on: false,
          sustain_modulator: null,
          post_sustain_on: false,
          post_sustains: {
            "post_sustains": [
              {
                "post_sustain_time_interval": 1,
                "post_sustain_time_interval_modulator": null,
                "post_sustain_end": 80.00,
                "post_sustain_end_modulator": null,
                "post_sustain_exponential": false,
                "post_sustain_convex": false,
                "post_sustain_slope": 4
              }
            ]
          },
          release_time_interval: 1,
          release_time_interval_modulator: null,
          release_end_value: 0.00,
          release_end_value_modulator: null,
          release_exponential: false,
          release_convex: false,
          release_slope: 4,
          output: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('envelope_generators_id_seq', (SELECT MAX(id) FROM envelope_generators));");
    });
};
