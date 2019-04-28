'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('news_tickers').del()
    .then(function () {
      // Inserts seed entries
      return knex('news_tickers').insert([
        {
          id: 1,
          headline: 'Welcome to FreqDomain2 Headlines. Your source for breaking FreqDomain2 News.',
          expired: false,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 2,
          headline: 'FreqDomain2 is in pre-production.',
          expired: false,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 3,
          headline: 'Currently working on: Dynamic Compressor (module 5). Stage 16 - April Consequence - April Skins added/Full Rendering Support.',
          expired: false,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('news_tickers_id_seq', (SELECT MAX(id) FROM news_tickers));");
    });
};
