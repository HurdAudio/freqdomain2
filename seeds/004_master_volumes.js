'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('master_volumes').del()
    .then(function () {
      // Inserts seed entries
      return knex('master_volumes').insert([
        {
          id: 1,
          user_id: 1,
          name: 'master volume',
          positionX: 1000,
          positionY: 400,
          master_volume_gain_value: 40,
          input: null,
          mute: false,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('master_volumes_id_seq', (SELECT MAX(id) FROM master_volumes));");
    });
};
