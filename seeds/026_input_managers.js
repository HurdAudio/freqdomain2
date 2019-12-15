'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('input_managers').del()
    .then(function () {
      // Inserts seed entries
      return knex('input_managers').insert([
        {
          id: 1,
          user_id: 1,
          name: 'input manager',
          input_strip: {
            "inputs": [
              {
                "source": null,
                "input": 1,
                "input_name": "Input 1",
                "input_gain": 40,
                "input_solo": false,
                "input_mute": false,
                "input_pan": 0
              }
            ]
          },
          output: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('input_managers_id_seq', (SELECT MAX(id) FROM input_managers));");
    });
};
