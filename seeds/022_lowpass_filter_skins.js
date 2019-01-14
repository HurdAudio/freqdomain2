'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lowpass_filter_skins').del()
    .then(function () {
      // Inserts seed entries
      return knex('lowpass_filter_skins').insert([
        {
          id: 1,
          name: 'Lowpass Filter: January A',
          month: 'january',
          rule: {
            "dates": [ 1, 3, 5, 7, 9, 11, 15, 19, 21, 25, 31 ]
          },
          face_path: '../img/january/crack-ice-18924656.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ffffff',
          face_font_color: '#000000',
          face_font_shadow_color: '#ffffff',
          top_path: '../img/january/47993523-ilustrado-textura-hielo-congelado-Foto-de-archivo.jpg',
          top_size: '210%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow_color: '#ffffff',
          signal_path: '../img/january/47993523-ilustrado-textura-hielo-congelado-Foto-de-archivo.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ffffff',
          signal_font_color: '#000000',
          signal_font_shadow_color: '#ffffff',
          display_path: '../img/january/depositphotos_52114867-stock-photo-seamless-ice-texture-winter-background.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ffffff',
          input_font_color: '#000000',
          input_font_shadow_color: '#ffffff',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ffffff',
          output_font_color: '#000000',
          output_font_shadow_color: '#ffffff',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#ffffff',
          frequency_display_font_color: '#000000',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#ffffff',
          detune_font_color: '#000000',
          q_size: '300%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#ffffff',
          q_font_color: '#000000',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '300%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#00ff00',
          slider_shader_color_2: '#C0C0C0',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 2,
          name: 'Lowpass Filter: January B',
          month: 'january',
          rule: {
            "dates": [ 2, 6, 10, 13, 17, 23, 27, 22, 26, 29 ]
          },
          face_path: '../img/january/ice-texture-3-imgp9050.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#FFFF66',
          face_font_color: '#8B008B',
          face_font_shadow_color: '#FFFF66',
          top_path: '../img/january/15840127-detailed-background-ice-texture.jpg',
          top_size: '170%',
          top_repeat: 'no-repeat',
          top_font_color: '#8B008B',
          top_font_shadow_color: '#FFFF66',
          signal_path: '../img/january/15840127-detailed-background-ice-texture.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#FFFF66',
          signal_font_color: '#8B008B',
          signal_font_shadow_color: '#FFFF66',
          display_path: '../img/january/240_F_60468101_gEOWVuTk5uQefx4cmEOLKRq4OFLSHSpn.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#FFFF66',
          input_font_color: '#8B008B',
          input_font_shadow_color: '#FFFF66',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#FFFF66',
          output_font_color: '#8B008B',
          output_font_shadow_color: '#FFFF66',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#FFFF66',
          frequency_display_font_color: '#8B008B',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#FFFF66',
          detune_font_color: '#8B008B',
          q_size: '300%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#FFFF66',
          q_font_color: '#8B008B',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '300%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#2F4F4F',
          slider_shader_color_2: '#C0C0C0',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 3,
          name: 'Lowpass Filter: January C',
          month: 'january',
          rule: {
            "dates": [ 4, 8, 12, 14, 16, 18, 20, 24, 28, 30 ]
          },
          face_path: '../img/january/TexturesCom_Ice0059_3_M.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#e5e5ff',
          face_font_color: '#000033',
          face_font_shadow_color: '#e5e5ff',
          top_path: '../img/january/TexturesCom_Ice0006_M.jpg',
          top_size: '170%',
          top_repeat: 'no-repeat',
          top_font_color: '#000033',
          top_font_shadow_color: '#e5e5ff',
          signal_path: '../img/january/TexturesCom_Ice0006_M.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#e5e5ff',
          signal_font_color: '#000033',
          signal_font_shadow_color: '#e5e5ff',
          display_path: '../img/january/TexturesCom_Ice0030_2_M.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#e5e5ff',
          input_font_color: '#000033',
          input_font_shadow_color: '#e5e5ff',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#e5e5ff',
          output_font_color: '#000033',
          output_font_shadow_color: '#e5e5ff',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#e5e5ff',
          frequency_display_font_color: '#8B008B',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#e5e5ff',
          detune_font_color: '#000033',
          q_size: '300%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#e5e5ff',
          q_font_color: '#000033',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '300%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#8000ff',
          slider_shader_color_2: '#C0C0C0',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 4,
          name: 'Lowpass Filter: February A',
          month: 'february',
          rule: {
            "dates": [ 1, 2, 3, 6, 7, 11, 12, 16, 21, 26 ]
          },
          face_path: '../img/february/embosed-velvet-fabric-sideimage.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#7CFC00',
          face_font_color: '#000033',
          face_font_shadow_color: '#7CFC00',
          top_path: '../img/february/321305420169_images.linnlive.com_c328c95887fce5fdcf72e68fef4b49e3_a7b6a72e-e7b5-43e3-abcf-54fe50850264.jpeg',
          top_size: '170%',
          top_repeat: 'no-repeat',
          top_font_color: '#000033',
          top_font_shadow_color: '#7CFC00',
          signal_path: '../img/february/321305420169_images.linnlive.com_c328c95887fce5fdcf72e68fef4b49e3_a7b6a72e-e7b5-43e3-abcf-54fe50850264.jpeg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#7CFC00',
          signal_font_color: '#000033',
          signal_font_shadow_color: '#7CFC00',
          display_path: '../img/february/shimmer-crushed-velvet-fabric-aqua.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#7CFC00',
          input_font_color: '#000033',
          input_font_shadow_color: '#7CFC00',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#7CFC00',
          output_font_color: '#000033',
          output_font_shadow_color: '#7CFC00',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#7CFC00',
          frequency_display_font_color: '#000033',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#7CFC00',
          detune_font_color: '#000033',
          q_size: '300%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#7CFC00',
          q_font_color: '#000033',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '300%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#2E8B57',
          slider_shader_color_2: '#C0C0C0',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 5,
          name: 'Lowpass Filter: February B',
          month: 'february',
          rule: {
            "dates": [ 4, 8, 9, 13, 17, 22, 23, 24, 27, 28 ]
          },
          face_path: '../img/february/240_F_36139765_0MHMMApw1Sj8I3AGBwCzQABy0O2cQHEH.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ffffcc',
          face_font_color: '#000033',
          face_font_shadow_color: '#ffffcc',
          top_path: '../img/february/fabric-sofa-texture-s-velvet-background-download-photos-velvet-red-fabric-sofa-texture-background-download-photos-photo-collection-with-photo-red-fabric.jpg',
          top_size: '170%',
          top_repeat: 'no-repeat',
          top_font_color: '#000033',
          top_font_shadow_color: '#ffffcc',
          signal_path: '../img/february/fabric-sofa-texture-s-velvet-background-download-photos-velvet-red-fabric-sofa-texture-background-download-photos-photo-collection-with-photo-red-fabric.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ffffcc',
          signal_font_color: '#000033',
          signal_font_shadow_color: '#ffffcc',
          display_path: '../img/february/leather-texture-white-sofas-and-on-pinterest_headboard-patterns_bay-window-table-rocking-bed-top-10-architects-armstrong-design-a-room-new-home-interiors-describe-personality-cool-bedrooms-d_250x225.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ffffcc',
          input_font_color: '#000033',
          input_font_shadow_color: '#ffffcc',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ffffcc',
          output_font_color: '#000033',
          output_font_shadow_color: '#ffffcc',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#ffffcc',
          frequency_display_font_color: '#000033',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#ffffcc',
          detune_font_color: '#000033',
          q_size: '300%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#ffffcc',
          q_font_color: '#000033',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '300%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#b2b200',
          slider_shader_color_2: '#C0C0C0',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 6,
          name: 'Lowpass Filter: February C',
          month: 'february',
          rule: {
            "dates": [ 5, 10, 14, 15, 18, 19, 20, 25, 29 ]
          },
          face_path: '../img/february/3332477693_cfaaf065c5.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#3232ff',
          face_font_color: '#00004c',
          face_font_shadow_color: '#3232ff',
          top_path: '../img/february/997f1c7e941cd06e2f2c7b99f2d014dd.jpg',
          top_size: '170%',
          top_repeat: 'no-repeat',
          top_font_color: '#00004c',
          top_font_shadow_color: '#3232ff',
          signal_path: '../img/february/997f1c7e941cd06e2f2c7b99f2d014dd.jpg',
          signal_size: '1600%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#3232ff',
          signal_font_color: '#00004c',
          signal_font_shadow_color: '#3232ff',
          display_path: '../img/february/cozy-velvet-nude-cream-fabric-1-zoom-big.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#3232ff',
          input_font_color: '#00004c',
          input_font_shadow_color: '#3232ff',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#3232ff',
          output_font_color: '#00004c',
          output_font_shadow_color: '#3232ff',
          frequency_display_size: '100%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#3232ff',
          frequency_display_font_color: '#00004c',
          detune_size: '100%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#3232ff',
          detune_font_color: '#00004c',
          q_size: '100%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#3232ff',
          q_font_color: '#00004c',
          mod_select_size: '100%',
          mod_repeat_value: 'no-repeat',
          slider_size: '200%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#000066',
          slider_shader_color_2: '#b2b2ff',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 7,
          name: 'Lowpass Filter: March A',
          month: 'march',
          rule: {
            "dates": [ 1, 7, 8, 9, 10, 11, 19, 20, 21, 30, 31 ]
          },
          face_path: '../img/march/ali-morshedlou-570680-unsplash.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ffff6f',
          face_font_color: '#191905',
          face_font_shadow_color: '#ffff6f',
          top_path: '../img/march/andrew-mcelroy-521058-unsplash.jpg',
          top_size: '110%',
          top_repeat: 'no-repeat',
          top_font_color: '#191905',
          top_font_shadow_color: '#ffff6f',
          signal_path: '../img/march/andrew-mcelroy-521058-unsplash.jpg',
          signal_size: '1600%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ffff6f',
          signal_font_color: '#191905',
          signal_font_shadow_color: '#ffff6f',
          display_path: '../img/march/luca-bravo-207056-unsplash.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ffff6f',
          input_font_color: '#191905',
          input_font_shadow_color: '#ffff6f',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ffff6f',
          output_font_color: '#191905',
          output_font_shadow_color: '#ffff6f',
          frequency_display_size: '100%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#ffff6f',
          frequency_display_font_color: '#191905',
          detune_size: '100%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#ffff6f',
          detune_font_color: '#191905',
          q_size: '100%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#ffff6f',
          q_font_color: '#191905',
          mod_select_size: '100%',
          mod_repeat_value: 'no-repeat',
          slider_size: '200%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#b2b223',
          slider_shader_color_2: '#ffff98',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 8,
          name: 'Lowpass Filter: March B',
          month: 'march',
          rule: {
            "dates": [ 4, 5, 6, 17, 18, 25, 26, 27, 28, 29 ]
          },
          face_path: '../img/march/heidi-mielke-558448-unsplash.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ffb62f',
          face_font_color: '#332205',
          face_font_shadow_color: '#ffb62f',
          top_path: '../img/march/ant-rozetsky-622106-unsplash.jpg',
          top_size: '110%',
          top_repeat: 'no-repeat',
          top_font_color: '#332205',
          top_font_shadow_color: '#ffb62f',
          signal_path: '../img/march/ant-rozetsky-622106-unsplash.jpg',
          signal_size: '1600%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ffb62f',
          signal_font_color: '#332205',
          signal_font_shadow_color: '#ffb62f',
          display_path: '../img/march/francesco-gallarotti-134633-unsplash.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ffb62f',
          input_font_color: '#332205',
          input_font_shadow_color: '#ffb62f',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ffb62f',
          output_font_color: '#332205',
          output_font_shadow_color: '#ffb62f',
          frequency_display_size: '100%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#ffb62f',
          frequency_display_font_color: '#332205',
          detune_size: '100%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#ffb62f',
          detune_font_color: '#332205',
          q_size: '100%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#ffb62f',
          q_font_color: '#332205',
          mod_select_size: '100%',
          mod_repeat_value: 'no-repeat',
          slider_size: '200%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#ffae19',
          slider_shader_color_2: '#ffe6ba',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 9,
          name: 'Lowpass Filter: March C',
          month: 'march',
          rule: {
            "dates": [ 2, 3, 12, 13, 14, 15, 16, 22, 23, 24 ]
          },
          face_path: '../img/march/nicolas-ladino-silva-263561-unsplash.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#32ff32',
          face_font_color: '#332205',
          face_font_shadow_color: '#32ff32',
          top_path: '../img/march/jorge-vasconez-423239-unsplash.jpg',
          top_size: '110%',
          top_repeat: 'no-repeat',
          top_font_color: '#332205',
          top_font_shadow_color: '#32ff32',
          signal_path: '../img/march/jorge-vasconez-423239-unsplash.jpg',
          signal_size: '1600%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#32ff32',
          signal_font_color: '#332205',
          signal_font_shadow_color: '#32ff32',
          display_path: '../img/march/karl-jk-hedin-573103-unsplash.jpg',
          input_size: '200%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#32ff32',
          input_font_color: '#332205',
          input_font_shadow_color: '#32ff32',
          output_size: '200%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#32ff32',
          output_font_color: '#332205',
          output_font_shadow_color: '#32ff32',
          frequency_display_size: '100%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#32ff32',
          frequency_display_font_color: '#332205',
          detune_size: '100%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#32ff32',
          detune_font_color: '#332205',
          q_size: '100%',
          q_repeat: 'no-repeat',
          q_box_shadow_color: '#32ff32',
          q_font_color: '#332205',
          mod_select_size: '100%',
          mod_repeat_value: 'no-repeat',
          slider_size: '200%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#006600',
          slider_shader_color_2: '#ccffcc',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('lowpass_filter_skins_id_seq', (SELECT MAX(id) FROM lowpass_filter_skins));");
    });
};
