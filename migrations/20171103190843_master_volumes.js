'use strict'
exports.up = function(knex, Promise) {
  return knex.schema.createTable('master_volumes', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.integer('positionX').notNullable().defaultTo(400);
    table.integer('positionY').notNullable().defaultTo(500);
    table.string('name').notNullable().defaultTo('master volume');
    table.integer('master_volume_gain_value').notNullable().defaultTo('0');
    table.json('input').defaultTo(null);
    table.boolean('mute').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('master_volumes');
};
