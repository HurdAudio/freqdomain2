'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('weather_modules', function(table) {
    table.increments().primary();
    table.integer('user_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.string('name').notNullable().defaultTo('weather module');
    table.boolean('zip_code_toggle').notNullable().defaultTo(true);
    table.integer('zip_digit_1').notNullable().defaultTo(6);
    table.json('zip_digit_1_modulator').defaultTo(null);
    table.integer('zip_digit_2').notNullable().defaultTo(0);
    table.json('zip_digit_2_modulator').defaultTo(null);
    table.integer('zip_digit_3').notNullable().defaultTo(6);
    table.json('zip_digit_3_modulator').defaultTo(null);
    table.integer('zip_digit_4').notNullable().defaultTo(4);
    table.json('zip_digit_4_modulator').defaultTo(null);
    table.integer('zip_digit_5').notNullable().defaultTo(7);
    table.json('zip_digit_5_modulator').defaultTo(null);
    table.string('country').notNullable().defaultTo('Spain');
    table.string('city').notNullable().defaultTo('Madrid');
    table.json('output').defaultTo(null);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('weather_modules');
};
