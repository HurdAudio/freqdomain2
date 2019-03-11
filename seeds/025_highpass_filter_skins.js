'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('highpass_filter_skins').del()
    .then(function () {
      // Inserts seed entries
      return knex('highpass_filter_skins').insert([
        {
          id: 1,
          name: 'Highpass Filter: January A',
          month: 'january',
          rule: {
            "dates": [ 1, 2, 5, 8, 9, 11, 15, 18, 21, 28, 31 ]
          },
          face_path: '../img/january/ice-2360369_1920.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#F0E68C',
          face_font_color: '#B22222',
          face_font_shadow_color: '#F0E68C',
          top_path: '../img/january/ice_texture_by_fiona_boyce-d35v9w5.jpg',
          top_size: '210%',
          top_repeat: 'no-repeat',
          top_font_color: '#B22222',
          top_font_shadow_color: '#F0E68C',
          signal_path: '../img/january/ice_texture_by_fiona_boyce-d35v9w5.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#F0E68C',
          signal_font_color: '#B22222',
          signal_font_shadow_color: '#F0E68C',
          display_path: '../img/january/highpassdisplaya.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#F0E68C',
          input_font_color: '#B22222',
          input_font_shadow_color: '#F0E68C',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#F0E68C',
          output_font_color: '#B22222',
          output_font_shadow_color: '#F0E68C',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#F0E68C',
          frequency_display_font_color: '#B22222',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#F0E68C',
          detune_font_color: '#B22222',
          q_size: '300%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#F0E68C',
          q_font_color: '#B22222',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '300%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#fff000',
          slider_shader_color_2: '#C0C0C0',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 2,
          name: 'Highpass Filter: January B',
          month: 'january',
          rule: {
            "dates": [ 3, 6, 10, 12, 19, 22, 23, 25, 26, 29 ]
          },
          face_path: '../img/january/wattex-4.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#00ffff',
          face_font_color: '#ff1919',
          face_font_shadow_color: '#00ffff',
          top_path: '../img/january/ice18.jpg',
          top_size: '210%',
          top_repeat: 'no-repeat',
          top_font_color: '#ff1919',
          top_font_shadow_color: '#00ffff',
          signal_path: '../img/january/ice18.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#00ffff',
          signal_font_color: '#ff1919',
          signal_font_shadow_color: '#00ffff',
          display_path: '../img/january/6030.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#00ffff',
          input_font_color: '#ff1919',
          input_font_shadow_color: '#00ffff',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#00ffff',
          output_font_color: '#ff1919',
          output_font_shadow_color: '#00ffff',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#00ffff',
          frequency_display_font_color: '#ff1919',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#00ffff',
          detune_font_color: '#ff1919',
          q_size: '300%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#00ffff',
          q_font_color: '#ff1919',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '300%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#ff4c4c',
          slider_shader_color_2: '#C0C0C0',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 3,
          name: 'Highpass Filter: January C',
          month: 'january',
          rule: {
            "dates": [ 4, 7, 13, 14, 16, 17, 20, 24, 27, 30 ]
          },
          face_path: '../img/january/ice-2360348_1920.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ffe5e5',
          face_font_color: '#4c0000',
          face_font_shadow_color: '#ffe5e5',
          top_path: '../img/january/background-168469_1920.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#4c0000',
          top_font_shadow_color: '#ffe5e5',
          signal_path: '../img/january/background-168469_1920.jpg',
          signal_size: '900%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ffe5e5',
          signal_font_color: '#4c0000',
          signal_font_shadow_color: '#ffe5e5',
          display_path: '../img/january/crystal-859317_1920.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ffe5e5',
          input_font_color: '#4c0000',
          input_font_shadow_color: '#ffe5e5',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ffe5e5',
          output_font_color: '#4c0000',
          output_font_shadow_color: '#ffe5e5',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#ffe5e5',
          frequency_display_font_color: '#4c0000',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#ffe5e5',
          detune_font_color: '#4c0000',
          q_size: '300%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#ffe5e5',
          q_font_color: '#4c0000',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '300%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#ffe5e5',
          slider_shader_color_2: '#C0C0C0',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 4,
          name: 'Highpass Filter: February A',
          month: 'february',
          rule: {
            "dates": [ 1, 3, 5, 7, 9, 11, 17, 19, 21, 29 ]
          },
          face_path: '../img/february/20150917_101545.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#009900',
          face_font_color: '#003300',
          face_font_shadow_color: '#009900',
          top_path: '../img/february/51tTuOxuykL._SX355_.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#003300',
          top_font_shadow_color: '#009900',
          signal_path: '../img/february/51tTuOxuykL._SX355_.jpg',
          signal_size: '900%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#009900',
          signal_font_color: '#003300',
          signal_font_shadow_color: '#009900',
          display_path: '../img/february/fabrics_2.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#009900',
          input_font_color: '#003300',
          input_font_shadow_color: '#009900',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#009900',
          output_font_color: '#003300',
          output_font_shadow_color: '#009900',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#009900',
          frequency_display_font_color: '#003300',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#009900',
          detune_font_color: '#003300',
          q_size: '300%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#009900',
          q_font_color: '#003300',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '300%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#009900',
          slider_shader_color_2: '#C0C0C0',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 5,
          name: 'Highpass Filter: February B',
          month: 'february',
          rule: {
            "dates": [ 2, 8, 10, 13, 15, 22, 23, 25, 27 ]
          },
          face_path: '../img/february/depositphotos_80357568-stock-photo-thai-silk-fabric-texture.jpg',
          face_size: '120%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ffff00',
          face_font_color: '#191900',
          face_font_shadow_color: '#ffff00',
          top_path: '../img/february/red_crinkle_2.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#191900',
          top_font_shadow_color: '#ffff00',
          signal_path: '../img/february/red_crinkle_2.jpg',
          signal_size: '900%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ffff00',
          signal_font_color: '#191900',
          signal_font_shadow_color: '#ffff00',
          display_path: '../img/february/41558189-white-silk-fabric-texture-and-background-seamless.jpg',
          input_size: '100%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ffff00',
          input_font_color: '#191900',
          input_font_shadow_color: '#ffff00',
          output_size: '100%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ffff00',
          output_font_color: '#191900',
          output_font_shadow_color: '#ffff00',
          frequency_display_size: '500%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#ffff00',
          frequency_display_font_color: '#191900',
          detune_size: '500%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#ffff00',
          detune_font_color: '#191900',
          q_size: '500%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#ffff00',
          q_font_color: '#191900',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '400%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#ffff00',
          slider_shader_color_2: '#ffffb2',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 6,
          name: 'Highpass Filter: February C',
          month: 'february',
          rule: {
            "dates": [ 4, 6, 12, 14, 16, 18, 20, 24, 26, 28 ]
          },
          face_path: '../img/february/Airforce_detail_2_LR.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ff7f7f',
          face_font_color: '#330000',
          face_font_shadow_color: '#ff7f7f',
          top_path: '../img/february/MiaVelvet_periwinkle.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#330000',
          top_font_shadow_color: '#ff7f7f',
          signal_path: '../img/february/MiaVelvet_periwinkle.jpg',
          signal_size: '900%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ff7f7f',
          signal_font_color: '#330000',
          signal_font_shadow_color: '#ff7f7f',
          display_path: '../img/february/harrison_oblong_cushion_cream_b.jpg',
          input_size: '100%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ff7f7f',
          input_font_color: '#330000',
          input_font_shadow_color: '#ff7f7f',
          output_size: '100%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ff7f7f',
          output_font_color: '#330000',
          output_font_shadow_color: '#ff7f7f',
          frequency_display_size: '500%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#ff7f7f',
          frequency_display_font_color: '#330000',
          detune_size: '500%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#ff7f7f',
          detune_font_color: '#330000',
          q_size: '500%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#ff7f7f',
          q_font_color: '#330000',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '400%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#ff7f7f',
          slider_shader_color_2: '#ffe5e5',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 7,
          name: 'Highpass Filter: March A',
          month: 'march',
          rule: {
            "dates": [ 1, 3, 5, 7, 9, 11, 13, 17, 21, 27, 31 ]
          },
          face_path: '../img/march/chris-davis-9963-unsplash.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#81ff81',
          face_font_color: '#0f330f',
          face_font_shadow_color: '#81ff81',
          top_path: '../img/march/daniel-von-appen-440688-unsplash.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#0f330f',
          top_font_shadow_color: '#81ff81',
          signal_path: '../img/march/daniel-von-appen-440688-unsplash.jpg',
          signal_size: '900%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#81ff81',
          signal_font_color: '#0f330f',
          signal_font_shadow_color: '#81ff81',
          display_path: '../img/march/joel-filipe-182051-unsplash.jpg',
          input_size: '100%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#81ff81',
          input_font_color: '#0f330f',
          input_font_shadow_color: '#81ff81',
          output_size: '100%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#81ff81',
          output_font_color: '#0f330f',
          output_font_shadow_color: '#81ff81',
          frequency_display_size: '500%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#81ff81',
          frequency_display_font_color: '#0f330f',
          detune_size: '500%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#81ff81',
          detune_font_color: '#0f330f',
          q_size: '500%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#81ff81',
          q_font_color: '#0f330f',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '400%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#81ff81',
          slider_shader_color_2: '#dbffdb',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 8,
          name: 'Highpass Filter: March B',
          month: 'march',
          rule: {
            "dates": [ 2, 4, 8, 15, 19, 22, 23, 25, 28, 29 ]
          },
          face_path: '../img/march/diego-carneiro-403920-unsplash.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ff3232',
          face_font_color: '#ffcccc',
          face_font_shadow_color: '#ff3232',
          top_path: '../img/march/osman-rana-639102-unsplash.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#ffcccc',
          top_font_shadow_color: '#ff3232',
          signal_path: '../img/march/osman-rana-639102-unsplash.jpg',
          signal_size: '1200%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ff3232',
          signal_font_color: '#ffcccc',
          signal_font_shadow_color: '#ff3232',
          display_path: '../img/march/katja-anna-krug-525632-unsplash.jpg',
          input_size: '200%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ff3232',
          input_font_color: '#ffcccc',
          input_font_shadow_color: '#ff3232',
          output_size: '200%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ff3232',
          output_font_color: '#ffcccc',
          output_font_shadow_color: '#ff3232',
          frequency_display_size: '200%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#ff3232',
          frequency_display_font_color: '#ffcccc',
          detune_size: '200%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#ff3232',
          detune_font_color: '#ffcccc',
          q_size: '200%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#ff3232',
          q_font_color: '#ffcccc',
          mod_select_size: '100%',
          mod_repeat_value: 'no-repeat',
          slider_size: '300%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#330000',
          slider_shader_color_2: '#ff7f7f',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 9,
          name: 'Highpass Filter: March C',
          month: 'march',
          rule: {
            "dates": [ 6, 10, 12, 14, 16, 18, 20, 24, 26, 30 ]
          },
          face_path: '../img/march/justin-lawrence-251809-unsplash.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#66ff66',
          face_font_color: '#001900',
          face_font_shadow_color: '#66ff66',
          top_path: '../img/march/drmakete-lab-57353-unsplash.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#001900',
          top_font_shadow_color: '#66ff66',
          signal_path: '../img/march/drmakete-lab-57353-unsplash.jpg',
          signal_size: '1200%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#66ff66',
          signal_font_color: '#001900',
          signal_font_shadow_color: '#66ff66',
          display_path: '../img/march/alex-rodriguez-santibanez-212948-unsplash.jpg',
          input_size: '200%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#66ff66',
          input_font_color: '#001900',
          input_font_shadow_color: '#66ff66',
          output_size: '200%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#66ff66',
          output_font_color: '#001900',
          output_font_shadow_color: '#66ff66',
          frequency_display_size: '350%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#66ff66',
          frequency_display_font_color: '#001900',
          detune_size: '350%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#66ff66',
          detune_font_color: '#001900',
          q_size: '350%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#66ff66',
          q_font_color: '#001900',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '300%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#006600',
          slider_shader_color_2: '#b2ffb2',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('highpass_filter_skins_id_seq', (SELECT MAX(id) FROM highpass_filter_skins));");
    });
};
