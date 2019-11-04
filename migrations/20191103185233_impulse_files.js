'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('impulse_files', function(table) {
    table.increments().primary();
    table.string('file_name').notNullable().defaultTo('');
    table.string('file_location').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('impulse_files');
};
