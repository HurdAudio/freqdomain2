'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function () {
      // Inserts seed entries
      return knex('messages').insert([
        {
          id: 1,
          user_author_id: 1,
          recipients_id: {
            "recipients": [ 1 ]
          },
          subject: 'This is a test message',
          message: 'I believe that drones are the future.',
          links: {
            "link": [ 'https://davedouglas.bandcamp.com/album/live-at-the-jazz-standard-12-set', 'https://sunaraw.bandcamp.com/album/live-in-oslo' ],
            "name": [ 'Live at the Jazz Standard [12​-​set] by Dave Douglas Quintet', 'LIVE IN OSLO by SUN ARAW BAND XII' ]
          },
          thread_parent: null,
          thread_child: 2,
          read: false,
          admin_message: false,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 2,
          user_author_id: 1,
          recipients_id: {
            "recipients": [ 1 ]
          },
          subject: 'This is a response message',
          message: 'Drone warfare is a damn drag.',
          links: {
            "link": [ 'https://bandcamp.com/HurdAudio' ],
            "name": [ 'My Collection' ]
          },
          thread_parent: 1,
          thread_child: null,
          read: false,
          admin_message: false,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('messages_id_seq', (SELECT MAX(id) FROM messages));");
    });
};
