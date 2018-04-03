'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('envelope_generators', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('envelope generator');
    table.float('attack_start', 4, 2).notNullable().defaultTo(0.00);
    table.json('attack_start_modulator').defaultTo(null);
    table.integer('attack_time_interval').notNullable().defaultTo(1);
    table.json('attack_time_interval_modulator').defaultTo(null);
    table.float('attack_end', 4, 2).notNullable().defaultTo(100.00);
    table.json('attack_end_modulator').defaultTo(null);
    table.boolean('attack_exponential').notNullable().defaultTo(false);
    table.boolean('attack_convex').notNullable().defaultTo(false);
    table.integer('attack_slope').notNullable().defaultTo(4);
    table.boolean('decay_on').defaultTo(true);
    table.json('decays').defaultTo(null);
    table.boolean('sustain_on').notNullable().defaultTo(true);
    table.json('sustain_modulator').defaultTo(null);
    table.boolean('post_sustain_on').notNullable().defaultTo(true);
    table.json('post_sustains').defaultTo(null);
    table.integer('release_time_interval').notNullable().defaultTo(1);
    table.json('release_time_interval_modulator').defaultTo(null);
    table.float('release_end_value', 4, 2).notNullable().defaultTo(0.00);
    table.json('release_end_value_modulator').defaultTo(null);
    table.boolean('release_exponential').notNullable().defaultTo(false);
    table.boolean('release_convex').notNullable().defaultTo(false);
    table.integer('release_slope').notNullable().defaultTo(4);
    table.json('output').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('envelope_generators');
};
