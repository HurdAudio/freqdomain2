'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('gains', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('gain');
    table.integer('gain_value').notNullable().defaultTo('0');
    table.json('gain_modulator').defaultTo(null);
    table.json('input').defaultTo(null);
    table.json('output').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gains');
};
