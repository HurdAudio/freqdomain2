'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('master_volume_skins', function(table) {
    table.increments().primary();
    table.string('name').notNullable().defaultTo('JanuaryA');
    table.string('month').notNullable().defaultTo('january');
    table.json('rule').defaultTo(null);
    table.string('face_path').notNullable().defaultTo('');
    table.string('face_size').notNullable().defaultTo('100%');
    table.string('face_repeat').notNullable().defaultTo('no-repeat');
    table.string('face_box_shadow_color').notNullable().defaultTo('');
    table.string('face_font_color').notNullable().defaultTo('#000000');
    table.string('face_font_shadow').notNullable().defaultTo('');
    table.string('top_path').notNullable().defaultTo('');
    table.string('top_size').notNullable().defaultTo('100%');
    table.string('top_repeat').notNullable().defaultTo('no-repeat');
    table.string('top_font_color').notNullable().defaultTo('#000000');
    table.string('top_font_shadow').notNullable().defaultTo('');
    table.string('signal_path').notNullable().defaultTo('');
    table.string('signal_size').notNullable().defaultTo('100%');
    table.string('signal_repeat').notNullable().defaultTo('no-repeat');
    table.string('signal_box_shadow_color').notNullable().defaultTo('');
    table.string('signal_font_color').notNullable().defaultTo('#000000');
    table.string('signal_font_shadow').notNullable().defaultTo('');
    table.string('display_path').notNullable().defaultTo('');
    table.string('input_size').notNullable().defaultTo('100%');
    table.string('input_repeat').notNullable().defaultTo('no-repeat');
    table.string('input_box_shadow_color').notNullable().defaultTo('');
    table.string('input_font_color').notNullable().defaultTo('#000000');
    table.string('input_font_shadow').notNullable().defaultTo('');
    table.string('display_span_color').notNullable().defaultTo('#fff000');
    table.string('gain_display_size').notNullable().defaultTo('');
    table.string('gain_display_repeat').notNullable().defaultTo('no-repeat');
    table.string('gain_display_box_shadow_color').notNullable().defaultTo('');
    table.string('gain_display_font_color').notNullable().defaultTo('#000000');
    table.string('master_volume_size').notNullable().defaultTo('');
    table.string('master_volume_repeat').notNullable().defaultTo('no-repeat');
    table.string('master_volume_box_shadow').notNullable().defaultTo('');
    table.string('slider_background_image').notNullable().defaultTo('../img/noun_149738_cc.png');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('master_volume_skins');
};
