'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          name: 'Devin Hurd',
          email: 'devin@devinhurd.com',
          hashed_password: '$2a$17$qGNwx2yIkhHKm/v7OMYz2eaumzo71W5EVjXhh19bGiHqdGXkhU71y',
          is_admin: true,
          user_avatar_url: 'https://media.licdn.com/media/AAEAAQAAAAAAAAf8AAAAJGMwZDYyMzc2LTAzOGEtNGYwOS1iMDViLTFlYjAyYjYzODIyMQ.jpg',
          associates: {},
          security: {
            "key": "nYeYs~_OHOXrL_XZ8IK3i8",
            "value": "PFIQefgqVYZPdaJcy09nVT"
          },
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
    });
};
