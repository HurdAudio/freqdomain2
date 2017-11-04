'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('signal_paths').del()
    .then(function () {
      // Inserts seed entries
      return knex('signal_paths').insert([
        {
          id: 1,
          user_id: 1,
          name: 'Default Signal Path',
          signal_path: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('signal_paths_id_seq', (SELECT MAX(id) FROM signal_paths));");
    });
};
