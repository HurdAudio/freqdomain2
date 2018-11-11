'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('random_number_generator_skins').del()
    .then(function () {
      // Inserts seed entries
      return knex('random_number_generator_skins').insert([
        {
          id: 1,
          name: 'Random Number Generator: January A',
          month: 'january',
          rule: {
            "dates": [ 1, 3, 5, 7, 9, 11, 13, 15, 21, 23, 31 ]
          },
          face_path: '../img/january/shutterstock_157109048.jpg',
          face_size: '200%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#999900',
          face_font_color: '#2F4F4F',
          face_font_shadow_color: '#999900',
          top_path: '../img/january/depositphotos_12319340-stock-photo-ice-texture.jpg',
          top_size: '210%',
          top_repeat: 'no-repeat',
          top_font_color: '#2F4F4F',
          top_font_shadow_color: '#999900',
          signal_path: '../img/january/F100009064.jpg',
          signal_size: '600%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#999900',
          signal_font_color: '#2F4F4F',
          signal_font_shadow_color: '#999900',
          display_path: '../img/january/F100009064.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#999900',
          output_font_color: '#2F4F4F',
          output_font_shadow_color: '#999900',
          output_display_size: '100%',
          output_display_repeat: 'no-repeat',
          output_display_box_shadow_color: '#999900',
          output_display_font_color: '#2F4F4F',
          minimum_display_path: '../img/january/F100009064.jpg',
          minimum_display_size: '100%',
          minimum_display_repeat: 'no-repeat',
          minimum_display_box_shadow_color: '#999900',
          minimum_slider_path: '../img/january/F100009064.jpg',
          minimum_slider_size: '100%',
          minimum_slider_repeat: 'no-repeat',
          minimum_slider_box_shadow_color: '#999900',
          minimum_modulator_path: '../img/january/F100009064.jpg',
          minimum_modulator_size: '100%',
          minimum_modulator_repeat: 'no-repeat',
          minimum_modulator_box_shadow_color: '#999900',
          maximum_display_path: '../img/january/F100009064.jpg',
          maximum_display_size: '100%',
          maximum_display_repeat: 'no-repeat',
          maximum_display_box_shadow_color: '#999900',
          maximum_slider_path: '../img/january/F100009064.jpg',
          maximum_slider_size: '100%',
          maximum_slider_repeat: 'no-repeat',
          maximum_slider_box_shadow_color: '#999900',
          maximum_modulator_path: '../img/january/F100009064.jpg',
          maximum_modulator_size: '100%',
          maximum_modulator_repeat: 'no-repeat',
          maximum_modulator_box_shadow_color: '#999900',
          interval_display_path: '../img/january/F100009064.jpg',
          interval_display_size: '100%',
          interval_display_repeat: 'no-repeat',
          interval_display_box_shadow_color: '#999900',
          interval_slider_path: '../img/january/F100009064.jpg',
          interval_slider_size: '100%',
          interval_slider_repeat: 'no-repeat',
          interval_slider_box_shadow_color: '#999900',
          interval_modulator_path: '../img/january/F100009064.jpg',
          interval_modulator_size: '100%',
          interval_modulator_repeat: 'no-repeat',
          interval_modulator_box_shadow_color: '#999900',
          slope_display_path: '../img/january/F100009064.jpg',
          slope_display_size: '300%',
          slope_display_repeat: 'no-repeat',
          slope_display_box_shadow_color: '#999900',
          slider_shader_color_1: '#7FFF00',
          slider_shader_color_2: '#ffffff',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 2,
          name: 'Random Number Generator: January B',
          month: 'january',
          rule: {
            "dates": [ 2, 4, 6, 17, 19, 22, 24, 25, 27, 29 ]
          },
          face_path: '../img/january/frost-on-glass-background-wallpaper-2.jpg',
          face_size: '200%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#000000',
          face_font_color: '#ea632a',
          face_font_shadow_color: '#000000',
          top_path: '../img/january/Skating-Ice-Textures-2.jpg',
          top_size: '210%',
          top_repeat: 'no-repeat',
          top_font_color: '#ea632a',
          top_font_shadow_color: '#000000',
          signal_path: '../img/january/Skating-Ice-Textures-2.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#000000',
          signal_font_color: '#ea632a',
          signal_font_shadow_color: '#000000',
          display_path: '../img/january/depositphotos_26348185-stock-photo-seamless-ice-texture.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#000000',
          output_font_color: '#ea632a',
          output_font_shadow_color: '#000000',
          output_display_size: '100%',
          output_display_repeat: 'no-repeat',
          output_display_box_shadow_color: '#000000',
          output_display_font_color: '#ea632a',
          minimum_display_path: '../img/january/depositphotos_26348185-stock-photo-seamless-ice-texture.jpg',
          minimum_display_size: '100%',
          minimum_display_repeat: 'no-repeat',
          minimum_display_box_shadow_color: '#000000',
          minimum_slider_path: '../img/january/depositphotos_26348185-stock-photo-seamless-ice-texture.jpg',
          minimum_slider_size: '100%',
          minimum_slider_repeat: 'no-repeat',
          minimum_slider_box_shadow_color: '#000000',
          minimum_modulator_path: '../img/january/depositphotos_26348185-stock-photo-seamless-ice-texture.jpg',
          minimum_modulator_size: '100%',
          minimum_modulator_repeat: 'no-repeat',
          minimum_modulator_box_shadow_color: '#000000',
          maximum_display_path: '../img/january/depositphotos_26348185-stock-photo-seamless-ice-texture.jpg',
          maximum_display_size: '100%',
          maximum_display_repeat: 'no-repeat',
          maximum_display_box_shadow_color: '#000000',
          maximum_slider_path: '../img/january/depositphotos_26348185-stock-photo-seamless-ice-texture.jpg',
          maximum_slider_size: '100%',
          maximum_slider_repeat: 'no-repeat',
          maximum_slider_box_shadow_color: '#000000',
          maximum_modulator_path: '../img/january/depositphotos_26348185-stock-photo-seamless-ice-texture.jpg',
          maximum_modulator_size: '100%',
          maximum_modulator_repeat: 'no-repeat',
          maximum_modulator_box_shadow_color: '#000000',
          interval_display_path: '../img/january/depositphotos_26348185-stock-photo-seamless-ice-texture.jpg',
          interval_display_size: '100%',
          interval_display_repeat: 'no-repeat',
          interval_display_box_shadow_color: '#000000',
          interval_slider_path: '../img/january/depositphotos_26348185-stock-photo-seamless-ice-texture.jpg',
          interval_slider_size: '100%',
          interval_slider_repeat: 'no-repeat',
          interval_slider_box_shadow_color: '#000000',
          interval_modulator_path: '../img/january/depositphotos_26348185-stock-photo-seamless-ice-texture.jpg',
          interval_modulator_size: '100%',
          interval_modulator_repeat: 'no-repeat',
          interval_modulator_box_shadow_color: '#000000',
          slope_display_path: '../img/january/depositphotos_26348185-stock-photo-seamless-ice-texture.jpg',
          slope_display_size: '300%',
          slope_display_repeat: 'no-repeat',
          slope_display_box_shadow_color: '#000000',
          slider_shader_color_1: '#7FFF00',
          slider_shader_color_2: '#ffffff',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 3,
          name: 'Random Number Generator: January C',
          month: 'january',
          rule: {
            "dates": [ 8, 10, 12, 14, 16, 18, 20, 26, 28, 30 ]
          },
          face_path: '../img/january/cracking_winter_ice__photomanipulated_texture_sjpg5575.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#e5e500',
          face_font_color: '#191900',
          face_font_shadow_color: '#e5e500',
          top_path: '../img/january/rngTopjanc.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#191900',
          top_font_shadow_color: '#e5e500',
          signal_path: '../img/january/rngTopjanc.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#e5e500',
          signal_font_color: '#191900',
          signal_font_shadow_color: '#e5e500',
          display_path: '../img/january/ice_moon_texture_by_arminius1871-d9rwbmo.png',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#e5e500',
          output_font_color: '#191900',
          output_font_shadow_color: '#e5e500',
          output_display_size: '100%',
          output_display_repeat: 'no-repeat',
          output_display_box_shadow_color: '#e5e500',
          output_display_font_color: '#191900',
          minimum_display_path: '../img/january/ice_moon_texture_by_arminius1871-d9rwbmo.png',
          minimum_display_size: '100%',
          minimum_display_repeat: 'no-repeat',
          minimum_display_box_shadow_color: '#e5e500',
          minimum_slider_path: '../img/january/ice_moon_texture_by_arminius1871-d9rwbmo.png',
          minimum_slider_size: '100%',
          minimum_slider_repeat: 'no-repeat',
          minimum_slider_box_shadow_color: '#e5e500',
          minimum_modulator_path: '../img/january/ice_moon_texture_by_arminius1871-d9rwbmo.png',
          minimum_modulator_size: '100%',
          minimum_modulator_repeat: 'no-repeat',
          minimum_modulator_box_shadow_color: '#e5e500',
          maximum_display_path: '../img/january/ice_moon_texture_by_arminius1871-d9rwbmo.png',
          maximum_display_size: '100%',
          maximum_display_repeat: 'no-repeat',
          maximum_display_box_shadow_color: '#e5e500',
          maximum_slider_path: '../img/january/ice_moon_texture_by_arminius1871-d9rwbmo.png',
          maximum_slider_size: '100%',
          maximum_slider_repeat: 'no-repeat',
          maximum_slider_box_shadow_color: '#e5e500',
          maximum_modulator_path: '../img/january/ice_moon_texture_by_arminius1871-d9rwbmo.png',
          maximum_modulator_size: '100%',
          maximum_modulator_repeat: 'no-repeat',
          maximum_modulator_box_shadow_color: '#e5e500',
          interval_display_path: '../img/january/ice_moon_texture_by_arminius1871-d9rwbmo.png',
          interval_display_size: '100%',
          interval_display_repeat: 'no-repeat',
          interval_display_box_shadow_color: '#e5e500',
          interval_slider_path: '../img/january/ice_moon_texture_by_arminius1871-d9rwbmo.png',
          interval_slider_size: '100%',
          interval_slider_repeat: 'no-repeat',
          interval_slider_box_shadow_color: '#e5e500',
          interval_modulator_path: '../img/january/ice_moon_texture_by_arminius1871-d9rwbmo.png',
          interval_modulator_size: '100%',
          interval_modulator_repeat: 'no-repeat',
          interval_modulator_box_shadow_color: '#e5e500',
          slope_display_path: '../img/january/ice_moon_texture_by_arminius1871-d9rwbmo.png',
          slope_display_size: '300%',
          slope_display_repeat: 'no-repeat',
          slope_display_box_shadow_color: '#e5e500',
          slider_shader_color_1: '#ffff4c',
          slider_shader_color_2: '#000000',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 4,
          name: 'Random Number Generator: February A',
          month: 'february',
          rule: {
            "dates": [ 1, 3, 4, 7, 10, 11, 14, 17, 21, 24 ]
          },
          face_path: '../img/february/silkyimage.jpeg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#b2b2ff',
          face_font_color: '#191900',
          face_font_shadow_color: '#b2b2ff',
          top_path: '../img/february/Fuschia_satin_6b9547a5-21a4-4280-ab1d-448ee279384b_1024x1024.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#191900',
          top_font_shadow_color: '#b2b2ff',
          signal_path: '../img/february/Fuschia_satin_6b9547a5-21a4-4280-ab1d-448ee279384b_1024x1024.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#b2b2ff',
          signal_font_color: '#191900',
          signal_font_shadow_color: '#b2b2ff',
          display_path: '../img/february/whiteSilk01.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#b2b2ff',
          output_font_color: '#191900',
          output_font_shadow_color: '#b2b2ff',
          output_display_size: '100%',
          output_display_repeat: 'no-repeat',
          output_display_box_shadow_color: '#b2b2ff',
          output_display_font_color: '#191900',
          minimum_display_path: '../img/february/whiteSilk01.jpg',
          minimum_display_size: '100%',
          minimum_display_repeat: 'no-repeat',
          minimum_display_box_shadow_color: '#b2b2ff',
          minimum_slider_path: '../img/february/whiteSilk01.jpg',
          minimum_slider_size: '100%',
          minimum_slider_repeat: 'no-repeat',
          minimum_slider_box_shadow_color: '#b2b2ff',
          minimum_modulator_path: '../img/february/whiteSilk01.jpg',
          minimum_modulator_size: '100%',
          minimum_modulator_repeat: 'no-repeat',
          minimum_modulator_box_shadow_color: '#b2b2ff',
          maximum_display_path: '../img/february/whiteSilk01.jpg',
          maximum_display_size: '100%',
          maximum_display_repeat: 'no-repeat',
          maximum_display_box_shadow_color: '#b2b2ff',
          maximum_slider_path: '../img/february/whiteSilk01.jpg',
          maximum_slider_size: '100%',
          maximum_slider_repeat: 'no-repeat',
          maximum_slider_box_shadow_color: '#b2b2ff',
          maximum_modulator_path: '../img/february/whiteSilk01.jpg',
          maximum_modulator_size: '100%',
          maximum_modulator_repeat: 'no-repeat',
          maximum_modulator_box_shadow_color: '#b2b2ff',
          interval_display_path: '../img/february/whiteSilk01.jpg',
          interval_display_size: '100%',
          interval_display_repeat: 'no-repeat',
          interval_display_box_shadow_color: '#b2b2ff',
          interval_slider_path: '../img/february/whiteSilk01.jpg',
          interval_slider_size: '100%',
          interval_slider_repeat: 'no-repeat',
          interval_slider_box_shadow_color: '#b2b2ff',
          interval_modulator_path: '../img/february/whiteSilk01.jpg',
          interval_modulator_size: '100%',
          interval_modulator_repeat: 'no-repeat',
          interval_modulator_box_shadow_color: '#b2b2ff',
          slope_display_path: '../img/february/whiteSilk01.jpg',
          slope_display_size: '300%',
          slope_display_repeat: 'no-repeat',
          slope_display_box_shadow_color: '#b2b2ff',
          slider_shader_color_1: '#00004c',
          slider_shader_color_2: '#ffffff',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 5,
          name: 'Random Number Generator: February B',
          month: 'february',
          rule: {
            "dates": [ 2, 6, 9, 13, 20, 22, 25, 26, 28, 29 ]
          },
          face_path: '../img/february/il_fullxfull.1219756639_8kay.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#FFD700',
          face_font_color: '#191900',
          face_font_shadow_color: '#FFD700',
          top_path: '../img/february/ab8de53165d5a5aeb2b421e52cfd853f.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#191900',
          top_font_shadow_color: '#FFD700',
          signal_path: '../img/february/ab8de53165d5a5aeb2b421e52cfd853f.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#FFD700',
          signal_font_color: '#191900',
          signal_font_shadow_color: '#FFD700',
          display_path: '../img/february/Fabric-Printing-14mm_Silk_Twill-4.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#FFD700',
          output_font_color: '#191900',
          output_font_shadow_color: '#FFD700',
          output_display_size: '100%',
          output_display_repeat: 'no-repeat',
          output_display_box_shadow_color: '#FFD700',
          output_display_font_color: '#191900',
          minimum_display_path: '../img/february/Fabric-Printing-14mm_Silk_Twill-4.jpg',
          minimum_display_size: '100%',
          minimum_display_repeat: 'no-repeat',
          minimum_display_box_shadow_color: '#FFD700',
          minimum_slider_path: '../img/february/Fabric-Printing-14mm_Silk_Twill-4.jpg',
          minimum_slider_size: '100%',
          minimum_slider_repeat: 'no-repeat',
          minimum_slider_box_shadow_color: '#FFD700',
          minimum_modulator_path: '../img/february/Fabric-Printing-14mm_Silk_Twill-4.jpg',
          minimum_modulator_size: '100%',
          minimum_modulator_repeat: 'no-repeat',
          minimum_modulator_box_shadow_color: '#FFD700',
          maximum_display_path: '../img/february/Fabric-Printing-14mm_Silk_Twill-4.jpg',
          maximum_display_size: '100%',
          maximum_display_repeat: 'no-repeat',
          maximum_display_box_shadow_color: '#FFD700',
          maximum_slider_path: '../img/february/Fabric-Printing-14mm_Silk_Twill-4.jpg',
          maximum_slider_size: '100%',
          maximum_slider_repeat: 'no-repeat',
          maximum_slider_box_shadow_color: '#FFD700',
          maximum_modulator_path: '../img/february/Fabric-Printing-14mm_Silk_Twill-4.jpg',
          maximum_modulator_size: '100%',
          maximum_modulator_repeat: 'no-repeat',
          maximum_modulator_box_shadow_color: '#FFD700',
          interval_display_path: '../img/february/Fabric-Printing-14mm_Silk_Twill-4.jpg',
          interval_display_size: '100%',
          interval_display_repeat: 'no-repeat',
          interval_display_box_shadow_color: '#FFD700',
          interval_slider_path: '../img/february/Fabric-Printing-14mm_Silk_Twill-4.jpg',
          interval_slider_size: '100%',
          interval_slider_repeat: 'no-repeat',
          interval_slider_box_shadow_color: '#FFD700',
          interval_modulator_path: '../img/february/Fabric-Printing-14mm_Silk_Twill-4.jpg',
          interval_modulator_size: '100%',
          interval_modulator_repeat: 'no-repeat',
          interval_modulator_box_shadow_color: '#FFD700',
          slope_display_path: '../img/february/Fabric-Printing-14mm_Silk_Twill-4.jpg',
          slope_display_size: '300%',
          slope_display_repeat: 'no-repeat',
          slope_display_box_shadow_color: '#FFD700',
          slider_shader_color_1: '#FF7F50',
          slider_shader_color_2: '#ffffff',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 6,
          name: 'Random Number Generator: February C',
          month: 'february',
          rule: {
            "dates": [ 5, 8, 12, 15, 16, 18, 19, 23, 27 ]
          },
          face_path: '../img/february/red_lamb_800px_002.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#3232ff',
          face_font_color: '#b2b2ff',
          face_font_shadow_color: '#3232ff',
          top_path: '../img/february/700_FO36139765_48f57dbd6c6fe84004857ff5287bab84.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#b2b2ff',
          top_font_shadow_color: '#3232ff',
          signal_path: '../img/february/700_FO36139765_48f57dbd6c6fe84004857ff5287bab84.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#3232ff',
          signal_font_color: '#b2b2ff',
          signal_font_shadow_color: '#3232ff',
          display_path: '../img/february/contemporary-ivory-velvet-upholstery-fabric-textured-winter-in-white-upholstery-fabric-renovation.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#3232ff',
          output_font_color: '#b2b2ff',
          output_font_shadow_color: '#3232ff',
          output_display_size: '100%',
          output_display_repeat: 'no-repeat',
          output_display_box_shadow_color: '#3232ff',
          output_display_font_color: '#b2b2ff',
          minimum_display_path: '../img/february/contemporary-ivory-velvet-upholstery-fabric-textured-winter-in-white-upholstery-fabric-renovation.jpg',
          minimum_display_size: '100%',
          minimum_display_repeat: 'no-repeat',
          minimum_display_box_shadow_color: '#3232ff',
          minimum_slider_path: '../img/february/contemporary-ivory-velvet-upholstery-fabric-textured-winter-in-white-upholstery-fabric-renovation.jpg',
          minimum_slider_size: '100%',
          minimum_slider_repeat: 'no-repeat',
          minimum_slider_box_shadow_color: '#3232ff',
          minimum_modulator_path: '../img/february/contemporary-ivory-velvet-upholstery-fabric-textured-winter-in-white-upholstery-fabric-renovation.jpg',
          minimum_modulator_size: '100%',
          minimum_modulator_repeat: 'no-repeat',
          minimum_modulator_box_shadow_color: '#3232ff',
          maximum_display_path: '../img/february/contemporary-ivory-velvet-upholstery-fabric-textured-winter-in-white-upholstery-fabric-renovation.jpg',
          maximum_display_size: '100%',
          maximum_display_repeat: 'no-repeat',
          maximum_display_box_shadow_color: '#3232ff',
          maximum_slider_path: '../img/february/contemporary-ivory-velvet-upholstery-fabric-textured-winter-in-white-upholstery-fabric-renovation.jpg',
          maximum_slider_size: '100%',
          maximum_slider_repeat: 'no-repeat',
          maximum_slider_box_shadow_color: '#3232ff',
          maximum_modulator_path: '../img/february/contemporary-ivory-velvet-upholstery-fabric-textured-winter-in-white-upholstery-fabric-renovation.jpg',
          maximum_modulator_size: '100%',
          maximum_modulator_repeat: 'no-repeat',
          maximum_modulator_box_shadow_color: '#3232ff',
          interval_display_path: '../img/february/contemporary-ivory-velvet-upholstery-fabric-textured-winter-in-white-upholstery-fabric-renovation.jpg',
          interval_display_size: '100%',
          interval_display_repeat: 'no-repeat',
          interval_display_box_shadow_color: '#3232ff',
          interval_slider_path: '../img/february/contemporary-ivory-velvet-upholstery-fabric-textured-winter-in-white-upholstery-fabric-renovation.jpg',
          interval_slider_size: '100%',
          interval_slider_repeat: 'no-repeat',
          interval_slider_box_shadow_color: '#3232ff',
          interval_modulator_path: '../img/february/contemporary-ivory-velvet-upholstery-fabric-textured-winter-in-white-upholstery-fabric-renovation.jpg',
          interval_modulator_size: '100%',
          interval_modulator_repeat: 'no-repeat',
          interval_modulator_box_shadow_color: '#3232ff',
          slope_display_path: '../img/february/contemporary-ivory-velvet-upholstery-fabric-textured-winter-in-white-upholstery-fabric-renovation.jpg',
          slope_display_size: '300%',
          slope_display_repeat: 'no-repeat',
          slope_display_box_shadow_color: '#3232ff',
          slider_shader_color_1: '#000033',
          slider_shader_color_2: '#ffffff',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 7,
          name: 'Random Number Generator: March A',
          month: 'march',
          rule: {
            "dates": [ 1, 2, 3, 4, 5, 11, 13, 15, 21, 24, 31 ]
          },
          face_path: '../img/march/spider-fitting-glass-500x500.jpg',
          face_size: '130%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ffff32',
          face_font_color: '#191900',
          face_font_shadow_color: '#ffff32',
          top_path: '../img/march/spider1.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#191900',
          top_font_shadow_color: '#ffff32',
          signal_path: '../img/march/spider1.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ffff32',
          signal_font_color: '#191900',
          signal_font_shadow_color: '#ffff32',
          display_path: '../img/march/glass-panel-transparent-png-420.png',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ffff32',
          output_font_color: '#191900',
          output_font_shadow_color: '#ffff32',
          output_display_size: '100%',
          output_display_repeat: 'no-repeat',
          output_display_box_shadow_color: '#ffff32',
          output_display_font_color: '#191900',
          minimum_display_path: '../img/march/glass-panel-transparent-png-420.png',
          minimum_display_size: '100%',
          minimum_display_repeat: 'no-repeat',
          minimum_display_box_shadow_color: '#ffff32',
          minimum_slider_path: '../img/march/glass-panel-transparent-png-420.png',
          minimum_slider_size: '100%',
          minimum_slider_repeat: 'no-repeat',
          minimum_slider_box_shadow_color: '#ffff32',
          minimum_modulator_path: '../img/march/glass-panel-transparent-png-420.png',
          minimum_modulator_size: '100%',
          minimum_modulator_repeat: 'no-repeat',
          minimum_modulator_box_shadow_color: '#ffff32',
          maximum_display_path: '../img/march/glass-panel-transparent-png-420.png',
          maximum_display_size: '100%',
          maximum_display_repeat: 'no-repeat',
          maximum_display_box_shadow_color: '#ffff32',
          maximum_slider_path: '../img/march/glass-panel-transparent-png-420.png',
          maximum_slider_size: '100%',
          maximum_slider_repeat: 'no-repeat',
          maximum_slider_box_shadow_color: '#ffff32',
          maximum_modulator_path: '../img/march/glass-panel-transparent-png-420.png',
          maximum_modulator_size: '100%',
          maximum_modulator_repeat: 'no-repeat',
          maximum_modulator_box_shadow_color: '#ffff32',
          interval_display_path: '../img/march/glass-panel-transparent-png-420.png',
          interval_display_size: '100%',
          interval_display_repeat: 'no-repeat',
          interval_display_box_shadow_color: '#ffff32',
          interval_slider_path: '../img/march/glass-panel-transparent-png-420.png',
          interval_slider_size: '100%',
          interval_slider_repeat: 'no-repeat',
          interval_slider_box_shadow_color: '#ffff32',
          interval_modulator_path: '../img/march/glass-panel-transparent-png-420.png',
          interval_modulator_size: '100%',
          interval_modulator_repeat: 'no-repeat',
          interval_modulator_box_shadow_color: '#ffff32',
          slope_display_path: '../img/march/glass-panel-transparent-png-420.png',
          slope_display_size: '300%',
          slope_display_repeat: 'no-repeat',
          slope_display_box_shadow_color: '#ffff32',
          slider_shader_color_1: '#ffff00',
          slider_shader_color_2: '#b2b200',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 8,
          name: 'Random Number Generator: March B',
          month: 'march',
          rule: {
            "dates": [ 6, 7, 8, 17, 19, 22, 25, 27, 28, 30 ]
          },
          face_path: '../img/march/florian-perennes-505181-unsplash.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ff4646',
          face_font_color: '#330505',
          face_font_shadow_color: '#ff4646',
          top_path: '../img/march/gonard-fluit-334702-unsplash.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#330505',
          top_font_shadow_color: '#ff4646',
          signal_path: '../img/march/gonard-fluit-334702-unsplash.jpg',
          signal_size: '1400%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ff4646',
          signal_font_color: '#330505',
          signal_font_shadow_color: '#ff4646',
          display_path: '../img/march/gabriele-diwald-474996-unsplash.jpg',
          output_size: '700%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ff4646',
          output_font_color: '#330505',
          output_font_shadow_color: '#ff4646',
          output_display_size: '100%',
          output_display_repeat: 'no-repeat',
          output_display_box_shadow_color: '#ff4646',
          output_display_font_color: '#330505',
          minimum_display_path: '../img/march/gabriele-diwald-474996-unsplash.jpg',
          minimum_display_size: '100%',
          minimum_display_repeat: 'no-repeat',
          minimum_display_box_shadow_color: '#ff4646',
          minimum_slider_path: '../img/march/gabriele-diwald-474996-unsplash.jpg',
          minimum_slider_size: '200%',
          minimum_slider_repeat: 'no-repeat',
          minimum_slider_box_shadow_color: '#ff4646',
          minimum_modulator_path: '../img/march/gabriele-diwald-474996-unsplash.jpg',
          minimum_modulator_size: '100%',
          minimum_modulator_repeat: 'no-repeat',
          minimum_modulator_box_shadow_color: '#ff4646',
          maximum_display_path: '../img/march/gabriele-diwald-474996-unsplash.jpg',
          maximum_display_size: '100%',
          maximum_display_repeat: 'no-repeat',
          maximum_display_box_shadow_color: '#ff4646',
          maximum_slider_path: '../img/march/gabriele-diwald-474996-unsplash.jpg',
          maximum_slider_size: '100%',
          maximum_slider_repeat: 'no-repeat',
          maximum_slider_box_shadow_color: '#ff4646',
          maximum_modulator_path: '../img/march/gabriele-diwald-474996-unsplash.jpg',
          maximum_modulator_size: '100%',
          maximum_modulator_repeat: 'no-repeat',
          maximum_modulator_box_shadow_color: '#ff4646',
          interval_display_path: '../img/march/gabriele-diwald-474996-unsplash.jpg',
          interval_display_size: '100%',
          interval_display_repeat: 'no-repeat',
          interval_display_box_shadow_color: '#ff4646',
          interval_slider_path: '../img/march/gabriele-diwald-474996-unsplash.jpg',
          interval_slider_size: '100%',
          interval_slider_repeat: 'no-repeat',
          interval_slider_box_shadow_color: '#ff4646',
          interval_modulator_path: '../img/march/gabriele-diwald-474996-unsplash.jpg',
          interval_modulator_size: '100%',
          interval_modulator_repeat: 'no-repeat',
          interval_modulator_box_shadow_color: '#ff4646',
          slope_display_path: '../img/march/gabriele-diwald-474996-unsplash.jpg',
          slope_display_size: '300%',
          slope_display_repeat: 'no-repeat',
          slope_display_box_shadow_color: '#ff4646',
          slider_shader_color_1: '#ffd1d1',
          slider_shader_color_2: '#7f0c0c',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 9,
          name: 'Random Number Generator: March C',
          month: 'march',
          rule: {
            "dates": [ 9, 10, 12, 14, 16, 18, 20, 23, 26, 29 ]
          },
          face_path: '../img/march/anita-jankovic-730367-unsplash.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ffff32',
          face_font_color: '#4c4c00',
          face_font_shadow_color: '#ffff32',
          top_path: '../img/march/craig-whitehead-253941-unsplash.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#4c4c00',
          top_font_shadow_color: '#ffff32',
          signal_path: '../img/march/craig-whitehead-253941-unsplash.jpg',
          signal_size: '1400%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ffff32',
          signal_font_color: '#4c4c00',
          signal_font_shadow_color: '#ffff32',
          display_path: '../img/march/daniel-von-appen-255530-unsplash.jpg',
          output_size: '700%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ffff32',
          output_font_color: '#4c4c00',
          output_font_shadow_color: '#ffff32',
          output_display_size: '100%',
          output_display_repeat: 'no-repeat',
          output_display_box_shadow_color: '#ffff32',
          output_display_font_color: '#4c4c00',
          minimum_display_path: '../img/march/daniel-von-appen-255530-unsplash.jpg',
          minimum_display_size: '100%',
          minimum_display_repeat: 'no-repeat',
          minimum_display_box_shadow_color: '#ffff32',
          minimum_slider_path: '../img/march/daniel-von-appen-255530-unsplash.jpg',
          minimum_slider_size: '200%',
          minimum_slider_repeat: 'no-repeat',
          minimum_slider_box_shadow_color: '#ffff32',
          minimum_modulator_path: '../img/march/daniel-von-appen-255530-unsplash.jpg',
          minimum_modulator_size: '200%',
          minimum_modulator_repeat: 'no-repeat',
          minimum_modulator_box_shadow_color: '#ffff32',
          maximum_display_path: '../img/march/daniel-von-appen-255530-unsplash.jpg',
          maximum_display_size: '100%',
          maximum_display_repeat: 'no-repeat',
          maximum_display_box_shadow_color: '#ffff32',
          maximum_slider_path: '../img/march/daniel-von-appen-255530-unsplash.jpg',
          maximum_slider_size: '200%',
          maximum_slider_repeat: 'no-repeat',
          maximum_slider_box_shadow_color: '#ffff32',
          maximum_modulator_path: '../img/march/daniel-von-appen-255530-unsplash.jpg',
          maximum_modulator_size: '200%',
          maximum_modulator_repeat: 'no-repeat',
          maximum_modulator_box_shadow_color: '#ffff32',
          interval_display_path: '../img/march/daniel-von-appen-255530-unsplash.jpg',
          interval_display_size: '100%',
          interval_display_repeat: 'no-repeat',
          interval_display_box_shadow_color: '#ffff32',
          interval_slider_path: '../img/march/daniel-von-appen-255530-unsplash.jpg',
          interval_slider_size: '200%',
          interval_slider_repeat: 'no-repeat',
          interval_slider_box_shadow_color: '#ffff32',
          interval_modulator_path: '../img/march/daniel-von-appen-255530-unsplash.jpg',
          interval_modulator_size: '100%',
          interval_modulator_repeat: 'no-repeat',
          interval_modulator_box_shadow_color: '#ffff32',
          slope_display_path: '../img/march/daniel-von-appen-255530-unsplash.jpg',
          slope_display_size: '300%',
          slope_display_repeat: 'no-repeat',
          slope_display_box_shadow_color: '#ffff32',
          slider_shader_color_1: '#cccc00',
          slider_shader_color_2: '#ffff4c',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('random_number_generator_skins_id_seq', (SELECT MAX(id) FROM random_number_generator_skins));");
    });
};
