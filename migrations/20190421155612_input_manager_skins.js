'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('input_manager_skins', function(table) {
    table.increments().primary();
    table.string('name').notNullable().defaultTo('JanuaryA');
    table.string('month').notNullable().defaultTo('january');
    table.json('rule').defaultTo(null);
    table.string('face_path').notNullable().defaultTo('');
    table.string('face_size').notNullable().defaultTo('100%');
    table.string('face_repeat').notNullable().defaultTo('no-repeat');
    table.string('face_box_shadow_color').notNullable().defaultTo('');
    table.string('face_font_color').notNullable().defaultTo('#000000');
    table.string('face_font_shadow_color').notNullable().defaultTo('');
    table.string('top_path').notNullable().defaultTo('');
    table.string('top_size').notNullable().defaultTo('100%');
    table.string('top_repeat').notNullable().defaultTo('no-repeat');
    table.string('top_font_color').notNullable().defaultTo('#000000');
    table.string('top_font_shadow_color').notNullable().defaultTo('');
    table.string('signal_path').notNullable().defaultTo('');
    table.string('signal_size').notNullable().defaultTo('100%');
    table.string('signal_repeat').notNullable().defaultTo('no-repeat');
    table.string('signal_box_shadow_color').notNullable().defaultTo('');
    table.string('signal_font_color').notNullable().defaultTo('#000000');
    table.string('signal_font_shadow_color').notNullable().defaultTo('');
    table.string('display_path').notNullable().defaultTo('');
    table.string('input_size').notNullable().defaultTo('100%');
    table.string('input_repeat').notNullable().defaultTo('no-repeat');
    table.string('input_box_shadow_color').notNullable().defaultTo('');
    table.string('input_font_color').notNullable().defaultTo('#000000');
    table.string('input_font_shadow_color').notNullable().defaultTo('');
    table.string('output_size').notNullable().defaultTo('100%');
    table.string('output_repeat').notNullable().defaultTo('no-repeat');
    table.string('output_box_shadow_color').notNullable().defaultTo('');
    table.string('output_font_color').notNullable().defaultTo('#000000');
    table.string('output_font_shadow_color').notNullable().defaultTo('');
    table.string('gainstrip_display').notNullable().defaultTo('');
    table.string('gainstrip_size').notNullable().defaultTo('');
    table.string('gainstrip_repeat').notNullable().defaultTo('no-repeat');
    table.string('slider_size').notNullable().defaultTo('');
    table.string('slide_repeat_value').notNullable().defaultTo('no-repeat');
    table.string('slider_shader_color_1').notNullable().defaultTo('');
    table.string('slider_shader_color_2').notNullable().defaultTo('');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('input_manager_skins');
};
