'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('test_tone_skins').del()
    .then(function () {
      // Inserts seed entries
      return knex('test_tone_skins').insert([
        {
          id: 1,
          name: 'Test Tone: January A',
          month: 'january',
          rule: {
            "dates": [ 1, 2, 5, 8, 9, 11, 15, 18, 21, 25, 28 ]
          },
          face_path: '../img/january/testToneFaceIce.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#00FE7F',
          face_font_color: '#000000',
          face_font_shadow: '#00FE7F',
          top_path: '../img/january/drop-of-water-846888_1920.jpg',
          top_size: '210%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#00FE7F',
          signal_path: '../img/january/drop-of-water-846888_1920.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#00FE7F',
          signal_font_color: '#000000',
          signal_font_shadow: '#00FE7F',
          display_path: '../img/january/testToneIceDisplay.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#00FE7F',
          output_font_color: '#000000',
          output_font_shadow: '#00FE7F',
          waveform_selector_display_size: '100%',
          waveform_selector_display_repeat: 'no-repeat',
          waveform_selector_display_box_shadow_color: '#00FE7F',
          waveform_selector_display_font_color: '#000000',
          frequency_size: '200%',
          frequency_repeat: 'no-repeat',
          frequency_box_shadow: '#00FE7F',
          frequency_slider_path: '../img/january/testToneIceDisplay.jpg',
          frequency_slider_size: '500%',
          frequency_slider_repeat: 'no-repeat',
          frequency_slider_box_shadow: '#00FE7F',
          volume_path: '../img/january/testToneIceDisplay.jpg',
          volume_size: '100%',
          volume_repeat: 'no-repeat',
          volume_box_shadow_color: '#00FE7F',
          volume_slider_path: '../img/january/testToneIceDisplay.jpg',
          volume_slider_size: '140%',
          volume_slider_repeat: 'no-repeat',
          volume_slider_box_shadow_color: '#00FE7F',
          slider_shader_color_1: '#B8C9D2',
          slider_shader_color_2: '#73899E',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 2,
          name: 'Test Tone: January B',
          month: 'january',
          rule: {
            "dates": [ 3, 6, 10, 12, 19, 22, 23, 26, 29, 30 ]
          },
          face_path: '../img/january/tileable-icy-and-watery-blue-textures-9.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#FFFE00',
          face_font_color: '#000000',
          face_font_shadow: '#FFFE00',
          top_path: '../img/january/0040-ice-snow-texture-seamless-hr.jpg',
          top_size: '210%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#FFFE00',
          signal_path: '../img/january/0040-ice-snow-texture-seamless-hr.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#FFFE00',
          signal_font_color: '#000000',
          signal_font_shadow: '#FFFE00',
          display_path: '../img/january/IceDiamonds.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#FFFE00',
          output_font_color: '#000000',
          output_font_shadow: '#FFFE00',
          waveform_selector_display_size: '100%',
          waveform_selector_display_repeat: 'no-repeat',
          waveform_selector_display_box_shadow_color: '#FFFE00',
          waveform_selector_display_font_color: '#000000',
          frequency_size: '200%',
          frequency_repeat: 'no-repeat',
          frequency_box_shadow: '#FFFE00',
          frequency_slider_path: '../img/january/IceDiamonds.jpg',
          frequency_slider_size: '500%',
          frequency_slider_repeat: 'no-repeat',
          frequency_slider_box_shadow: '#FFFE00',
          volume_path: '../img/january/IceDiamonds.jpg',
          volume_size: '100%',
          volume_repeat: 'no-repeat',
          volume_box_shadow_color: '#FFFE00',
          volume_slider_path: '../img/january/IceDiamonds.jpg',
          volume_slider_size: '140%',
          volume_slider_repeat: 'no-repeat',
          volume_slider_box_shadow_color: '#FFFE00',
          slider_shader_color_1: '#B8C9D2',
          slider_shader_color_2: '#73899E',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 3,
          name: 'Test Tone: January C',
          month: 'january',
          rule: {
            "dates": [ 4, 7, 13, 14, 16, 17, 20, 24, 27, 31 ]
          },
          face_path: '../img/january/iceage2_doc_6aed562d.png',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#FFFE00',
          face_font_color: '#000000',
          face_font_shadow: '#FFFE00',
          top_path: '../img/january/helt_tilbage_til_istiden2.jpg',
          top_size: '210%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#FFFE00',
          signal_path: '../img/january/helt_tilbage_til_istiden2.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#FFFE00',
          signal_font_color: '#000000',
          signal_font_shadow: '#FFFE00',
          display_path: '../img/january/ice-2-texture_f1UI3orO.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#FFFE00',
          output_font_color: '#000000',
          output_font_shadow: '#FFFE00',
          waveform_selector_display_size: '100%',
          waveform_selector_display_repeat: 'no-repeat',
          waveform_selector_display_box_shadow_color: '#FFFE00',
          waveform_selector_display_font_color: '#000000',
          frequency_size: '200%',
          frequency_repeat: 'no-repeat',
          frequency_box_shadow: '#FFFE00',
          frequency_slider_path: '../img/january/ice-2-texture_f1UI3orO.jpg',
          frequency_slider_size: '500%',
          frequency_slider_repeat: 'no-repeat',
          frequency_slider_box_shadow: '#FFFE00',
          volume_path: '../img/january/ice-2-texture_f1UI3orO.jpg',
          volume_size: '100%',
          volume_repeat: 'no-repeat',
          volume_box_shadow_color: '#FFFE00',
          volume_slider_path: '../img/january/ice-2-texture_f1UI3orO.jpg',
          volume_slider_size: '140%',
          volume_slider_repeat: 'no-repeat',
          volume_slider_box_shadow_color: '#FFFE00',
          slider_shader_color_1: '#B8C9D2',
          slider_shader_color_2: '#73899E',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 4,
          name: 'Test Tone: February A',
          month: 'february',
          rule: {
            "dates": [ 1, 3, 5, 7, 9, 11, 17, 19, 21, 29 ]
          },
          face_path: '../img/february/Dark-Red-Silk-Fabric-Texture.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#FFFE00',
          face_font_color: '#000000',
          face_font_shadow: '#FFFE00',
          top_path: '../img/february/Multi-Color-Douppioni-Yarn-Dyed-Shantung-Silk-Fabric-55-inch-H-300-32.jpg',
          top_size: '110%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#FFFE00',
          signal_path: '../img/february/Multi-Color-Douppioni-Yarn-Dyed-Shantung-Silk-Fabric-55-inch-H-300-32.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#FFFE00',
          signal_font_color: '#000000',
          signal_font_shadow: '#FFFE00',
          display_path: '../img/february/thai-silk-gold-color-background-image-43445890.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#FFFE00',
          output_font_color: '#000000',
          output_font_shadow: '#FFFE00',
          waveform_selector_display_size: '100%',
          waveform_selector_display_repeat: 'no-repeat',
          waveform_selector_display_box_shadow_color: '#FFFE00',
          waveform_selector_display_font_color: '#000000',
          frequency_size: '200%',
          frequency_repeat: 'no-repeat',
          frequency_box_shadow: '#FFFE00',
          frequency_slider_path: '../img/february/thai-silk-gold-color-background-image-43445890.jpg',
          frequency_slider_size: '500%',
          frequency_slider_repeat: 'no-repeat',
          frequency_slider_box_shadow: '#FFFE00',
          volume_path: '../img/february/thai-silk-gold-color-background-image-43445890.jpg',
          volume_size: '100%',
          volume_repeat: 'no-repeat',
          volume_box_shadow_color: '#FFFE00',
          volume_slider_path: '../img/february/thai-silk-gold-color-background-image-43445890.jpg',
          volume_slider_size: '140%',
          volume_slider_repeat: 'no-repeat',
          volume_slider_box_shadow_color: '#FFFE00',
          slider_shader_color_1: '#B8C9D2',
          slider_shader_color_2: '#73899E',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 5,
          name: 'Test Tone: February B',
          month: 'february',
          rule: {
            "dates": [ 2, 8, 10, 13, 15, 22, 23, 25, 27 ]
          },
          face_path: '../img/february/silk-texture-16872.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#b2b2ff',
          face_font_color: '#000000',
          face_font_shadow: '#b2b2ff',
          top_path: '../img/february/0087-cm-jpeg-shiny-red-satin-fabric-background.jpg',
          top_size: '110%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#b2b2ff',
          signal_path: '../img/february/0087-cm-jpeg-shiny-red-satin-fabric-background.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#b2b2ff',
          signal_font_color: '#000000',
          signal_font_shadow: '#b2b2ff',
          display_path: '../img/february/silk-fabric-texture-6.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#b2b2ff',
          output_font_color: '#000000',
          output_font_shadow: '#b2b2ff',
          waveform_selector_display_size: '100%',
          waveform_selector_display_repeat: 'no-repeat',
          waveform_selector_display_box_shadow_color: '#b2b2ff',
          waveform_selector_display_font_color: '#000000',
          frequency_size: '200%',
          frequency_repeat: 'no-repeat',
          frequency_box_shadow: '#b2b2ff',
          frequency_slider_path: '../img/february/silk-fabric-texture-6.jpg',
          frequency_slider_size: '500%',
          frequency_slider_repeat: 'no-repeat',
          frequency_slider_box_shadow: '#b2b2ff',
          volume_path: '../img/february/silk-fabric-texture-6.jpg',
          volume_size: '100%',
          volume_repeat: 'no-repeat',
          volume_box_shadow_color: '#b2b2ff',
          volume_slider_path: '../img/february/silk-fabric-texture-6.jpg',
          volume_slider_size: '140%',
          volume_slider_repeat: 'no-repeat',
          volume_slider_box_shadow_color: '#b2b2ff',
          slider_shader_color_1: '#1919ff',
          slider_shader_color_2: '#73899E',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 6,
          name: 'Test Tone: February C',
          month: 'february',
          rule: {
            "dates": [ 4, 6, 12, 14, 16, 18, 20, 24, 26, 28 ]
          },
          face_path: '../img/february/q5puhkj0yrx23ewe5q8xxuqcj5twb41xwcuoaw4os28fjv4pb4gt8tohzwfpesyv-.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ADFF2F',
          face_font_color: '#000000',
          face_font_shadow: '#ADFF2F',
          top_path: '../img/february/velvettester.jpeg',
          top_size: '110%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#ADFF2F',
          signal_path: '../img/february/velvettester.jpeg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ADFF2F',
          signal_font_color: '#000000',
          signal_font_shadow: '#ADFF2F',
          display_path: '../img/february/6720216_20.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ADFF2F',
          output_font_color: '#000000',
          output_font_shadow: '#ADFF2F',
          waveform_selector_display_size: '100%',
          waveform_selector_display_repeat: 'no-repeat',
          waveform_selector_display_box_shadow_color: '#ADFF2F',
          waveform_selector_display_font_color: '#000000',
          frequency_size: '200%',
          frequency_repeat: 'no-repeat',
          frequency_box_shadow: '#ADFF2F',
          frequency_slider_path: '../img/february/6720216_20.jpg',
          frequency_slider_size: '500%',
          frequency_slider_repeat: 'no-repeat',
          frequency_slider_box_shadow: '#ADFF2F',
          volume_path: '../img/february/6720216_20.jpg',
          volume_size: '100%',
          volume_repeat: 'no-repeat',
          volume_box_shadow_color: '#ADFF2F',
          volume_slider_path: '../img/february/6720216_20.jpg',
          volume_slider_size: '140%',
          volume_slider_repeat: 'no-repeat',
          volume_slider_box_shadow_color: '#ADFF2F',
          slider_shader_color_1: '#20B2AA',
          slider_shader_color_2: '#73899E',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('test_tone_skins_id_seq', (SELECT MAX(id) FROM test_tone_skins));");
    });
};
