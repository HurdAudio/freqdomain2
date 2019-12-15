'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('delays', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('delay');
    table.float('delay', 2, 3).notNullable().defaultTo(0.500);
    table.json('delay_modulator').defaultTo(null);
    table.json('input').defaultTo(null);
    table.json('output').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('delays');
};
