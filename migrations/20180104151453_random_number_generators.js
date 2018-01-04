'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('random_number_generators', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('random number generator');
    table.integer('interval').notNullable().defaultTo(1);
    table.json('interval_modulator').defaultTo(null);
    table.float('maximum', 4, 3).notNullable().defaultTo(0.000);
    table.json('maximum_modulator').defaultTo(null);
    table.float('minimum', 4, 3).notNullable().defaultTo(0.000);
    table.json('minimum_modulator').defaultTo(null);
    table.boolean('continuous').notNullable().defaultTo(false);
    table.boolean('exponential').defaultTo(false);
    table.boolean('convex').notNullable().defaultTo(false);
    table.integer('slope').defaultTo(4);
    table.json('output').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('random_number_generators');
};
