'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dynamic_compressors', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('dynamic compressor');
    table.float('threshold').notNullable().defaultTo(-24.00);
    table.float('knee').notNullable().defaultTo(30.00);
    table.float('ratio').notNullable().defaultTo(12.00);
    table.float('attack', 5, 3).notNullable().defaultTo(0.003);
    table.float('release', 5, 3).notNullable().defaultTo(0.250);
    table.json('input').defaultTo(null);
    table.json('output').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dynamic_compressors');
};
