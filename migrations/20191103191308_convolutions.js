'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('convolutions', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.integer('impulse').defaultTo(null).references('id').inTable('impulse_files').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('convolution');
    table.boolean('normalize').notNullable().defaultTo(false);
    table.json('input').defaultTo(null);
    table.json('output').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('convolutions');
};
