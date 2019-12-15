'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('impulse_files').del()
    .then(function () {
      // Inserts seed entries
      return knex('impulse_files').insert([
        {
          id: 1,
          file_name: 'Null File',
          file_location: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('impulse_files_id_seq', (SELECT MAX(id) FROM impulse_files));");
    });
};
