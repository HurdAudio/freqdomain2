'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('peaking_filters', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('peaking filter');
    table.float('frequency', 5, 3).notNullable().defaultTo(110.000);
    table.json('frequency_modulator').defaultTo(null);
    table.float('detune', 4, 2).notNullable().defaultTo(0.00);
    table.json('detune_modulator').defaultTo(null);
    table.float('q', 4, 4).notNullable().defaultTo(0.0000);
    table.json('q_modulator').defaultTo(null);
    table.float('gain', 2, 1).notNullable().defaultTo(0.0);
    table.json('gain_modulator').defaultTo(null);
    table.json('input').defaultTo(null);
    table.json('output').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('peaking_filters');
};
