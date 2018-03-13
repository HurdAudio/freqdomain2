'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('gain_skins').del()
    .then(function () {
      // Inserts seed entries
      return knex('gain_skins').insert([
        {
          id: 1,
          name: 'Gain: January A',
          month: 'january',
          rule: {
            "dates": [ 1, 2, 5, 8, 9, 11, 15, 18, 21, 25, 31 ]
          },
          face_path: '../img/january/gain-ice-1.jpg',
          face_size: '300%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#FFFE00',
          face_font_color: '#000000',
          face_font_shadow: '#FFFE00',
          top_path: '../img/january/gain-ice-1.jpg',
          top_size: '90%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#FFFE00',
          signal_path: '../img/january/gain-ice-1.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#FFFE00',
          signal_font_color: '#000000',
          signal_font_shadow: '#FFFE00',
          display_path: '../img/january/gain-ice-2.jpg',
          input_size: '1000%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#FFFE00',
          input_font_color: '#000000',
          input_font_shadow: '#FFFE00',
          output_size: '1000%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#FFFE00',
          output_font_color: '#000000',
          output_font_shadow: '#FFFE00',
          gain_display_size: '100%',
          gain_display_repeat: 'no-repeat',
          gain_display_box_shadow_color: '#FFFE00',
          gain_display_font_color: '#000000',
          gain_volume_size: '40%',
          gain_volume_repeat: 'no-repeat',
          gain_volume_box_shadow: '#FFFE00',
          gain_slider_path: '../img/january/gain-ice-2.jpg',
          gain_modulator_select_path: '../img/january/gain-ice-2.jpg',
          gain_modulator_select_size: '100%',
          gain_modulator_select_repeat: 'no-repeat',
          gain_modulator_select_box_shadow_color: '#FFFE00',
          gain_modulator_edit_box_shadow_color: '#FFFE00',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 2,
          name: 'Gain: January B',
          month: 'january',
          rule: {
            "dates": [ 3, 6, 10, 12, 19, 22, 23, 26, 29, 30 ]
          },
          face_path: '../img/january/gainface_ice_janb.jpg',
          face_size: '200%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#800000',
          face_font_color: '#000000',
          face_font_shadow: '#800000',
          top_path: '../img/january/gaintop_janb.jpg',
          top_size: '90%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#800000',
          signal_path: '../img/january/gaintop_janb.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#800000',
          signal_font_color: '#000000',
          signal_font_shadow: '#800000',
          display_path: '../img/january/gaindisplays_janb.jpg',
          input_size: '1000%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#800000',
          input_font_color: '#000000',
          input_font_shadow: '#800000',
          output_size: '1000%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#800000',
          output_font_color: '#000000',
          output_font_shadow: '#800000',
          gain_display_size: '100%',
          gain_display_repeat: 'no-repeat',
          gain_display_box_shadow_color: '#800000',
          gain_display_font_color: '#000000',
          gain_volume_size: '40%',
          gain_volume_repeat: 'no-repeat',
          gain_volume_box_shadow: '#800000',
          gain_slider_path: '../img/january/gaindisplays_janb.jpg',
          gain_modulator_select_path: '../img/january/gaindisplays_janb.jpg',
          gain_modulator_select_size: '100%',
          gain_modulator_select_repeat: 'no-repeat',
          gain_modulator_select_box_shadow_color: '#800000',
          gain_modulator_edit_box_shadow_color: '#800000',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 3,
          name: 'Gain: January C',
          month: 'january',
          rule: {
            "dates": [ 4, 7, 13, 14, 16, 17, 20, 24, 27, 28 ]
          },
          face_path: '../img/january/gainfacejanc.png',
          face_size: '200%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#9EECFD',
          face_font_color: '#000000',
          face_font_shadow: '#9EECFD',
          top_path: '../img/january/gaininputsjanc.jpg',
          top_size: '90%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#9EECFD',
          signal_path: '../img/january/gaininputsjanc.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#9EECFD',
          signal_font_color: '#000000',
          signal_font_shadow: '#9EECFD',
          display_path: '../img/january/gaindisplayjanc.jpg',
          input_size: '1000%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#9EECFD',
          input_font_color: '#000000',
          input_font_shadow: '#9EECFD',
          output_size: '1000%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#9EECFD',
          output_font_color: '#000000',
          output_font_shadow: '#9EECFD',
          gain_display_size: '200%',
          gain_display_repeat: 'no-repeat',
          gain_display_box_shadow_color: '#9EECFD',
          gain_display_font_color: '#000000',
          gain_volume_size: '100%',
          gain_volume_repeat: 'no-repeat',
          gain_volume_box_shadow: '#9EECFD',
          gain_slider_path: '../img/january/gaindisplayjanc.jpg',
          gain_modulator_select_path: '../img/january/gaindisplayjanc.jpg',
          gain_modulator_select_size: '100%',
          gain_modulator_select_repeat: 'no-repeat',
          gain_modulator_select_box_shadow_color: '#9EECFD',
          gain_modulator_edit_box_shadow_color: '#9EECFD',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 4,
          name: 'Gain: February A',
          month: 'february',
          rule: {
            "dates": [ 1, 3, 5, 7, 9, 11, 17, 19, 21, 27, 29 ]
          },
          face_path: '../img/february/gainfaceFeba.jpg',
          face_size: '200%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#4CFF4C',
          face_font_color: '#000000',
          face_font_shadow: '#4CFF4C',
          top_path: '../img/february/gainTopFeba.jpg',
          top_size: '90%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#4CFF4C',
          signal_path: '../img/february/gainTopFeba.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#4CFF4C',
          signal_font_color: '#000000',
          signal_font_shadow: '#4CFF4C',
          display_path: '../img/february/10564ddce04f8f3.jpg',
          input_size: '1000%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#4CFF4C',
          input_font_color: '#000000',
          input_font_shadow: '#4CFF4C',
          output_size: '1000%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#4CFF4C',
          output_font_color: '#000000',
          output_font_shadow: '#4CFF4C',
          gain_display_size: '200%',
          gain_display_repeat: 'no-repeat',
          gain_display_box_shadow_color: '#4CFF4C',
          gain_display_font_color: '#000000',
          gain_volume_size: '100%',
          gain_volume_repeat: 'no-repeat',
          gain_volume_box_shadow: '#4CFF4C',
          gain_slider_path: '../img/february/10564ddce04f8f3.jpg',
          gain_modulator_select_path: '../img/february/10564ddce04f8f3.jpg',
          gain_modulator_select_size: '100%',
          gain_modulator_select_repeat: 'no-repeat',
          gain_modulator_select_box_shadow_color: '#4CFF4C',
          gain_modulator_edit_box_shadow_color: '#4CFF4C',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 5,
          name: 'Gain: February B',
          month: 'february',
          rule: {
            "dates": [ 2, 8, 10, 13, 15, 22, 23, 25, 26, 28 ]
          },
          face_path: '../img/february/gain_redfaceB.jpg',
          face_size: '200%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#FFFE00',
          face_font_color: '#000000',
          face_font_shadow: '#FFFE00',
          top_path: '../img/february/red_wine_2.jpg',
          top_size: '90%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#FFFE00',
          signal_path: '../img/february/red_wine_2.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#FFFE00',
          signal_font_color: '#000000',
          signal_font_shadow: '#FFFE00',
          display_path: '../img/february/white-background-wallpaper-2956247.jpg',
          input_size: '1000%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#FFFE00',
          input_font_color: '#000000',
          input_font_shadow: '#FFFE00',
          output_size: '1000%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#FFFE00',
          output_font_color: '#000000',
          output_font_shadow: '#FFFE00',
          gain_display_size: '200%',
          gain_display_repeat: 'no-repeat',
          gain_display_box_shadow_color: '#FFFE00',
          gain_display_font_color: '#000000',
          gain_volume_size: '100%',
          gain_volume_repeat: 'no-repeat',
          gain_volume_box_shadow: '#FFFE00',
          gain_slider_path: '../img/february/white-background-wallpaper-2956247.jpg',
          gain_modulator_select_path: '../img/february/white-background-wallpaper-2956247.jpg',
          gain_modulator_select_size: '100%',
          gain_modulator_select_repeat: 'no-repeat',
          gain_modulator_select_box_shadow_color: '#FFFE00',
          gain_modulator_edit_box_shadow_color: '#FFFE00',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 6,
          name: 'Gain: February C',
          month: 'february',
          rule: {
            "dates": [ 4, 6, 12, 14, 16, 18, 20, 24 ]
          },
          face_path: '../img/february/gainFebFaceC.jpg',
          face_size: '200%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#4c0000',
          face_font_color: '#000000',
          face_font_shadow: '#4c0000',
          top_path: '../img/february/red_velvet_wallpaper_008.jpg',
          top_size: '90%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#4c0000',
          signal_path: '../img/february/red_velvet_wallpaper_008.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#4c0000',
          signal_font_color: '#000000',
          signal_font_shadow: '#4c0000',
          display_path: '../img/february/0018-pink-velvet-fabric-texture-seamless-hr.jpg',
          input_size: '1000%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#4c0000',
          input_font_color: '#000000',
          input_font_shadow: '#4c0000',
          output_size: '1000%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#4c0000',
          output_font_color: '#000000',
          output_font_shadow: '#4c0000',
          gain_display_size: '200%',
          gain_display_repeat: 'no-repeat',
          gain_display_box_shadow_color: '#4c0000',
          gain_display_font_color: '#000000',
          gain_volume_size: '100%',
          gain_volume_repeat: 'no-repeat',
          gain_volume_box_shadow: '#4c0000',
          gain_slider_path: '../img/february/0018-pink-velvet-fabric-texture-seamless-hr.jpg',
          gain_modulator_select_path: '../img/february/0018-pink-velvet-fabric-texture-seamless-hr.jpg',
          gain_modulator_select_size: '100%',
          gain_modulator_select_repeat: 'no-repeat',
          gain_modulator_select_box_shadow_color: '#4c0000',
          gain_modulator_edit_box_shadow_color: '#4c0000',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('gain_skins_id_seq', (SELECT MAX(id) FROM gain_skins));");
    });
};