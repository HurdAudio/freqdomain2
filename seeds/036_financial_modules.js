'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('financial_modules').del()
    .then(function () {
      // Inserts seed entries
      return knex('financial_modules').insert([
        {
          id: 1,
          user_id: 1,
          name: 'financial module',
          stock_symbol: null,
          mutual_fund_symbol: null,
          base_currency: null,
          exchange_currency: null,
          output: null,
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('financial_modules_id_seq', (SELECT MAX(id) FROM financial_modules));");
    });
};
