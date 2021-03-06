'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('low_pass_filters', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('low pass filter');
    table.integer('positionX').notNullable().defaultTo(400);
    table.integer('positionY').notNullable().defaultTo(500);
    table.float('frequency', 5, 3).notNullable().defaultTo(110.000);
    table.json('frequency_modulator').defaultTo(null);
    table.float('detune', 4, 2).notNullable().defaultTo(0.00);
    table.json('detune_modulator').defaultTo(null);
    table.float('q', 4, 4).notNullable().defaultTo(0.0000);
    table.json('q_modulator').defaultTo(null);
    table.json('input').defaultTo(null);
    table.json('output').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('low_pass_filters');
};
