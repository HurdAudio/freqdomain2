'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('signal_paths', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('');
    table.json('signal_path').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('signal_paths');
};
