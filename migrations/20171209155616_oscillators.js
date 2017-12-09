'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('oscillators', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('oscillator');
    table.string('waveform').notNullable().defaultTo('sine');
    table.json('waveform_modulator').defaultTo(null);
    table.float('hertz', 5, 3).notNullable().defaultTo(440.000);
    table.json('hertz_modulator').defaultTo(null);
    table.float('detune', 3, 2).notNullable().defaultTo(0.00);
    table.json('detune_modulator').defaultTo(null);
    table.json('output').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('oscillators');
};
