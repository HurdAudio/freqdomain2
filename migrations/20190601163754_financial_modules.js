'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('financial_modules', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('financial module');
    table.string('stock_symbol').defaultTo(null);
    table.string('mutual_fund_symbol').defaultTo(null);
    table.string('base_currency').defaultTo(null);
    table.string('exchange_currency').defaultTo(null);
    table.json('output').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('financial_modules');
};
