'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('messages', function(table) {
    table.increments().primary();
    table.integer('user_author_id').notNullable().defaultTo(1).references('id').inTable('users').onDelete('CASCADE').index();
    table.json('recipients_id').defaultTo(null);
    table.string('subject').notNullable().defaultTo('');
    table.text('message').notNullable().defaultTo('');
    table.json('links').defaultTo(null);
    table.integer('thread_parent').defaultTo(null);
    table.integer('thread_child').defaultTo(null);
    table.boolean('read').notNullable().defaultTo(false);
    table.boolean('admin_message').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('messages');
};
