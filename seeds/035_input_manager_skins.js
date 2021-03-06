'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('input_manager_skins').del()
    .then(function () {
      // Inserts seed entries
      return knex('input_manager_skins').insert([
        {
          id: 1,
          name: 'Input Manager: January A',
          month: 'january',
          rule: {
            "dates": [ 1, 2, 3, 4, 5, 11, 12, 13, 21, 22, 31 ]
          },
          face_path: '../img/january/0040-ice-snow-texture-seamless.jpg',
          face_size: '110%',
          face_repeat: 'repeat',
          face_box_shadow_color: '#4c4c00',
          face_font_color: '#ffff32',
          face_font_shadow_color: '#4c4c00',
          top_path: '../img/january/18712675-seamless-ice-texture-computer-graphic-big-collection.jpg',
          top_size: '210%',
          top_repeat: 'no-repeat',
          top_font_color: '#ffff32',
          top_font_shadow_color: '#4c4c00',
          signal_path: '../img/january/18712675-seamless-ice-texture-computer-graphic-big-collection.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#4c4c00',
          signal_font_color: '#ffff32',
          signal_font_shadow_color: '#4c4c00',
          display_path: '../img/january/depositphotos_10916329-stock-photo-ice-seamless-texture.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#4c4c00',
          input_font_color: '#ffff32',
          input_font_shadow_color: '#4c4c00',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#4c4c00',
          output_font_color: '#ffff32',
          output_font_shadow_color: '#4c4c00',
          gainstrip_display: '../img/january/depositphotos_10916329-stock-photo-ice-seamless-texture.jpg',
          gainstrip_size: '200%',
          gainstrip_repeat: 'no-repeat',
          slider_size: '100%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#b2b200',
          slider_shader_color_2: '#ffffe5',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 2,
          name: 'Input Manager: January B',
          month: 'january',
          rule: {
            "dates": [ 6, 7, 8, 14, 15, 23, 24, 25, 26, 27 ]
          },
          face_path: '../img/january/ice-2361424_1920.jpg',
          face_size: '300%',
          face_repeat: 'repeat',
          face_box_shadow_color: '#ffb732',
          face_font_color: '#191000',
          face_font_shadow_color: '#ffb732',
          top_path: '../img/january/580_ice_ball_210.jpg',
          top_size: '210%',
          top_repeat: 'no-repeat',
          top_font_color: '#191000',
          top_font_shadow_color: '#ffb732',
          signal_path: '../img/january/580_ice_ball_210.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ffb732',
          signal_font_color: '#191000',
          signal_font_shadow_color: '#ffb732',
          display_path: '../img/january/Ice_Castles_Stillwater_Minnesota_10.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ffb732',
          input_font_color: '#191000',
          input_font_shadow_color: '#ffb732',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ffb732',
          output_font_color: '#191000',
          output_font_shadow_color: '#ffb732',
          gainstrip_display: '../img/january/Ice_Castles_Stillwater_Minnesota_10.jpg',
          gainstrip_size: '200%',
          gainstrip_repeat: 'no-repeat',
          slider_size: '100%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#ffa500',
          slider_shader_color_2: '#fff6e5',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 3,
          name: 'Input Manager: January C',
          month: 'january',
          rule: {
            "dates": [ 9, 10, 16, 17, 18, 19, 20, 28, 29, 30 ]
          },
          face_path: '../img/january/zoltan-tasi-508344-unsplash.jpg',
          face_size: '155%',
          face_repeat: 'repeat',
          face_box_shadow_color: '#84ff84',
          face_font_color: '#051905',
          face_font_shadow_color: '#84ff84',
          top_path: '../img/january/ricardo-gomez-angel-435885-unsplash.jpg',
          top_size: '210%',
          top_repeat: 'no-repeat',
          top_font_color: '#051905',
          top_font_shadow_color: '#84ff84',
          signal_path: '../img/january/ricardo-gomez-angel-435885-unsplash.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#84ff84',
          signal_font_color: '#051905',
          signal_font_shadow_color: '#84ff84',
          display_path: '../img/january/felipe-cotrim-397113-unsplash.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#84ff84',
          input_font_color: '#051905',
          input_font_shadow_color: '#84ff84',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#84ff84',
          output_font_color: '#051905',
          output_font_shadow_color: '#84ff84',
          gainstrip_display: '../img/january/felipe-cotrim-397113-unsplash.jpg',
          gainstrip_size: '200%',
          gainstrip_repeat: 'no-repeat',
          slider_size: '100%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#197f19',
          slider_shader_color_2: '#c1ffc1',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 4,
          name: 'Input Manager: February A',
          month: 'february',
          rule: {
            "dates": [ 1, 3, 5, 7, 9, 11, 13, 15, 21, 23 ]
          },
          face_path: '../img/february/textile-2072568_1920.jpg',
          face_size: '100%',
          face_repeat: 'repeat',
          face_box_shadow_color: '#1919ff',
          face_font_color: '#00007f',
          face_font_shadow_color: '#1919ff',
          top_path: '../img/february/rawpixel-567027-unsplash.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#00007f',
          top_font_shadow_color: '#1919ff',
          signal_path: '../img/february/rawpixel-567027-unsplash.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#1919ff',
          signal_font_color: '#00007f',
          signal_font_shadow_color: '#1919ff',
          display_path: '../img/february/rawpixel-584299-unsplash.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#1919ff',
          input_font_color: '#00007f',
          input_font_shadow_color: '#1919ff',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#1919ff',
          output_font_color: '#00007f',
          output_font_shadow_color: '#1919ff',
          gainstrip_display: '../img/february/rawpixel-584299-unsplash.jpg',
          gainstrip_size: '200%',
          gainstrip_repeat: 'no-repeat',
          slider_size: '100%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#0000cc',
          slider_shader_color_2: '#b2b2ff',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 5,
          name: 'Input Manager: February B',
          month: 'february',
          rule: {
            "dates": [ 2, 4, 6, 17, 19, 22, 24, 25, 27, 29 ]
          },
          face_path: '../img/february/guatemela-1191472_1920.jpg',
          face_size: '100%',
          face_repeat: 'repeat',
          face_box_shadow_color: '#4cff4c',
          face_font_color: '#003300',
          face_font_shadow_color: '#4cff4c',
          top_path: '../img/february/pattern-2032058_1920.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#003300',
          top_font_shadow_color: '#4cff4c',
          signal_path: '../img/february/pattern-2032058_1920.jpg',
          signal_size: '1700%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#4cff4c',
          signal_font_color: '#003300',
          signal_font_shadow_color: '#4cff4c',
          display_path: '../img/february/canvas-578193_1920.jpg',
          input_size: '300%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#4cff4c',
          input_font_color: '#003300',
          input_font_shadow_color: '#4cff4c',
          output_size: '300%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#4cff4c',
          output_font_color: '#003300',
          output_font_shadow_color: '#4cff4c',
          gainstrip_display: '../img/february/canvas-578193_1920.jpg',
          gainstrip_size: '200%',
          gainstrip_repeat: 'no-repeat',
          slider_size: '100%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#001900',
          slider_shader_color_2: '#99ff99',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 6,
          name: 'Input Manager: February C',
          month: 'february',
          rule: {
            "dates": [ 8, 10, 12, 14, 16, 18, 20, 26, 28 ]
          },
          face_path: '../img/february/jeans-91315_1920.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#f7c568',
          face_font_color: '#181206',
          face_font_shadow_color: '#f7c568',
          top_path: '../img/february/knitting-1972345_1920.jpg',
          top_size: '100%',
          top_repeat: 'repeat',
          top_font_color: '#181206',
          top_font_shadow_color: '#f7c568',
          signal_path: '../img/february/knitting-1972345_1920.jpg',
          signal_size: '1700%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#f7c568',
          signal_font_color: '#181206',
          signal_font_shadow_color: '#f7c568',
          display_path: '../img/february/fabric-1639314_1920.jpg',
          input_size: '300%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#f7c568',
          input_font_color: '#181206',
          input_font_shadow_color: '#f7c568',
          output_size: '300%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#f7c568',
          output_font_color: '#181206',
          output_font_shadow_color: '#f7c568',
          gainstrip_display: '../img/february/fabric-1639314_1920.jpg',
          gainstrip_size: '200%',
          gainstrip_repeat: 'no-repeat',
          slider_size: '100%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#f9d38e',
          slider_shader_color_2: '#936d28',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 7,
          name: 'Input Manager: March A',
          month: 'march',
          rule: {
            "dates": [ 1, 7, 8, 9, 10, 11, 19, 20, 21, 30, 31 ]
          },
          face_path: '../img/march/michael-116043-unsplash.jpg',
          face_size: '360%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#42de42',
          face_font_color: '#041504',
          face_font_shadow_color: '#42de42',
          top_path: '../img/march/michael-eggerl-38880-unsplash.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#041504',
          top_font_shadow_color: '#42de42',
          signal_path: '../img/march/michael-eggerl-38880-unsplash.jpg',
          signal_size: '17000%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#42de42',
          signal_font_color: '#041504',
          signal_font_shadow_color: '#42de42',
          display_path: '../img/march/lance-anderson-211148-unsplash.jpg',
          input_size: '300%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#42de42',
          input_font_color: '#041504',
          input_font_shadow_color: '#42de42',
          output_size: '300%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#42de42',
          output_font_color: '#041504',
          output_font_shadow_color: '#42de42',
          gainstrip_display: '../img/march/lance-anderson-211148-unsplash.jpg',
          gainstrip_size: '300%',
          gainstrip_repeat: 'no-repeat',
          slider_size: '400%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#0d410d',
          slider_shader_color_2: '#96ed96',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 8,
          name: 'Input Manager: March B',
          month: 'march',
          rule: {
            "dates": [ 4, 5, 6, 17, 18, 25, 26, 27, 28, 29 ]
          },
          face_path: '../img/march/max-ostrozhinskiy-1nNtM9P-m0I-unsplash.jpg',
          face_size: '160%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#f6e537',
          face_font_color: '#181605',
          face_font_shadow_color: '#f6e537',
          top_path: '../img/march/anastasia-dulgier-IM0alEzCTjs-unsplash.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#181605',
          top_font_shadow_color: '#f6e537',
          signal_path: '../img/march/anastasia-dulgier-IM0alEzCTjs-unsplash.jpg',
          signal_size: '1700%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#f6e537',
          signal_font_color: '#181605',
          signal_font_shadow_color: '#f6e537',
          display_path: '../img/march/aaron-jean-CRz2Caqqb2U-unsplash.jpg',
          input_size: '300%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#f6e537',
          input_font_color: '#181605',
          input_font_shadow_color: '#f6e537',
          output_size: '300%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#f6e537',
          output_font_color: '#181605',
          output_font_shadow_color: '#f6e537',
          gainstrip_display: '../img/march/aaron-jean-CRz2Caqqb2U-unsplash.jpg',
          gainstrip_size: '300%',
          gainstrip_repeat: 'no-repeat',
          slider_size: '400%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#312d0b',
          slider_shader_color_2: '#f8ec73',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 9,
          name: 'Input Manager: March C',
          month: 'march',
          rule: {
            "dates": [ 2, 3, 12, 13, 14, 15, 16, 22, 23, 24 ]
          },
          face_path: '../img/march/stained-glass-windows-2669333_1920.jpg',
          face_size: '160%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#7fce57',
          face_font_color: '#0c1408',
          face_font_shadow_color: '#7fce57',
          top_path: '../img/march/metallizer-1734069_1920.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#0c1408',
          top_font_shadow_color: '#7fce57',
          signal_path: '../img/march/metallizer-1734069_1920.jpg',
          signal_size: '1700%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#7fce57',
          signal_font_color: '#0c1408',
          signal_font_shadow_color: '#7fce57',
          display_path: '../img/march/drop-1000480_1920.jpg',
          input_size: '300%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#7fce57',
          input_font_color: '#0c1408',
          input_font_shadow_color: '#7fce57',
          output_size: '300%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#7fce57',
          output_font_color: '#0c1408',
          output_font_shadow_color: '#7fce57',
          gainstrip_display: '../img/march/drop-1000480_1920.jpg',
          gainstrip_size: '300%',
          gainstrip_repeat: 'no-repeat',
          slider_size: '400%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#3f672b',
          slider_shader_color_2: '#a5dc89',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('input_manager_skins_id_seq', (SELECT MAX(id) FROM input_manager_skins));");
    });
};
