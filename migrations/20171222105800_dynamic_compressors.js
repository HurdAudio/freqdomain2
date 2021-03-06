'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dynamic_compressors', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('dynamic compressor');
    table.integer('positionX').notNullable().defaultTo(400);
    table.integer('positionY').notNullable().defaultTo(500);
    table.float('threshold').notNullable().defaultTo(-24.00);
    table.json('threshold_modulator').defaultTo(null);
    table.float('knee').notNullable().defaultTo(30.00);
    table.json('knee_modulator').defaultTo(null);
    table.float('ratio').notNullable().defaultTo(12.00);
    table.json('ratio_modulator').defaultTo(null);
    table.float('attack', 5, 3).notNullable().defaultTo(0.003);
    table.json('attack_modulator').defaultTo(null);
    table.float('release', 5, 3).notNullable().defaultTo(0.250);
    table.json('release_modulator').defaultTo(null);
    table.json('input').defaultTo(null);
    table.json('output').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('dynamic_compressors');
};
