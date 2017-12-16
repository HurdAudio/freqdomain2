'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('test_tones', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('test tone');
    table.integer('gain_value').notNullable().defaultTo(0);
    table.string('waveform').notNullable().defaultTo('sine');
    table.float('hertz', 5, 3).notNullable().defaultTo(440.000);
    table.boolean('device_on').notNullable().defaultTo(false);
    table.json('output').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('test_tones');
};
