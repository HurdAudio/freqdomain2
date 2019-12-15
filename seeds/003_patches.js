'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('patches').del()
    .then(function () {
      // Inserts seed entries
      return knex('patches').insert([
        {
          id: 1,
          user_id: 1,
          name: 'Default Patch',
          patch: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('patches_id_seq', (SELECT MAX(id) FROM patches));");
    });
};
