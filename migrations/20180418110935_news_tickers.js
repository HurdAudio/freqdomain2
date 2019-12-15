'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('news_tickers', function(table) {
    table.increments().primary();
    table.string('headline').notNullable().defaultTo('');
    table.boolean('expired').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('news_tickers');
};
