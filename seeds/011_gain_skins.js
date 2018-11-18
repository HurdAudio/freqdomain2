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
          top_size: '100%',
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
          gain_volume_size: '100%',
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
          top_size: '100%',
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
          gain_volume_size: '100%',
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
          top_size: '100%',
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
          top_size: '100%',
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
          top_size: '100%',
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
            "dates": [ 4, 6, 12, 14, 16, 18, 20, 24, 31 ]
          },
          face_path: '../img/february/gainFebFaceC.jpg',
          face_size: '200%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#4c0000',
          face_font_color: '#000000',
          face_font_shadow: '#4c0000',
          top_path: '../img/february/red_velvet_wallpaper_008.jpg',
          top_size: '100%',
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
        },
        {
          id: 7,
          name: 'Gain: March A',
          month: 'march',
          rule: {
            "dates": [ 1, 3, 5, 7, 9, 11, 15, 19, 21, 25 ]
          },
          face_path: '../img/march/glass-1984631_1920.jpg',
          face_size: '200%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ccccff',
          face_font_color: '#000000',
          face_font_shadow: '#ccccff',
          top_path: '../img/march/frosted-glass-2373716_1920.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#ccccff',
          signal_path: '../img/march/frosted-glass-2373716_1920.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ccccff',
          signal_font_color: '#000000',
          signal_font_shadow: '#ccccff',
          display_path: '../img/march/rain-738229_1920.jpg',
          input_size: '1000%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ccccff',
          input_font_color: '#000000',
          input_font_shadow: '#ccccff',
          output_size: '1000%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ccccff',
          output_font_color: '#000000',
          output_font_shadow: '#ccccff',
          gain_display_size: '200%',
          gain_display_repeat: 'no-repeat',
          gain_display_box_shadow_color: '#ccccff',
          gain_display_font_color: '#000000',
          gain_volume_size: '100%',
          gain_volume_repeat: 'no-repeat',
          gain_volume_box_shadow: '#ccccff',
          gain_slider_path: '../img/march/rain-738229_1920.jpg',
          gain_modulator_select_path: '../img/march/rain-738229_1920.jpg',
          gain_modulator_select_size: '100%',
          gain_modulator_select_repeat: 'no-repeat',
          gain_modulator_select_box_shadow_color: '#ccccff',
          gain_modulator_edit_box_shadow_color: '#ccccff',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 8,
          name: 'Gain: March B',
          month: 'march',
          rule: {
            "dates": [ 4, 8, 12, 14, 16, 18, 20, 24, 28, 30 ]
          },
          face_path: '../img/march/glass-2566808_1920.jpg',
          face_size: '200%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#FFFF33',
          face_font_color: '#333300',
          face_font_shadow: '#FFFF33',
          top_path: '../img/march/moscow-1570686_1920.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#333300',
          top_font_shadow: '#FFFF33',
          signal_path: '../img/march/moscow-1570686_1920.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#FFFF33',
          signal_font_color: '#333300',
          signal_font_shadow: '#FFFF33',
          display_path: '../img/march/ice-1664562_1920.jpg',
          input_size: '1000%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#FFFF33',
          input_font_color: '#333300',
          input_font_shadow: '#FFFF33',
          output_size: '1000%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#FFFF33',
          output_font_color: '#333300',
          output_font_shadow: '#FFFF33',
          gain_display_size: '200%',
          gain_display_repeat: 'no-repeat',
          gain_display_box_shadow_color: '#FFFF33',
          gain_display_font_color: '#333300',
          gain_volume_size: '100%',
          gain_volume_repeat: 'no-repeat',
          gain_volume_box_shadow: '#FFFF33',
          gain_slider_path: '../img/march/ice-1664562_1920.jpg',
          gain_modulator_select_path: '../img/march/ice-1664562_1920.jpg',
          gain_modulator_select_size: '100%',
          gain_modulator_select_repeat: 'no-repeat',
          gain_modulator_select_box_shadow_color: '#FFFF33',
          gain_modulator_edit_box_shadow_color: '#FFFF33',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 9,
          name: 'Gain: March C',
          month: 'march',
          rule: {
            "dates": [ 2, 6, 10, 13, 17, 22, 23, 26, 27, 29 ]
          },
          face_path: '../img/march/file-EVKBscQDnJ.jpg',
          face_size: '200%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#e5e5ff',
          face_font_color: '#000033',
          face_font_shadow: '#e5e5ff',
          top_path: '../img/march/HighRiseGlass0105_download600.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#000033',
          top_font_shadow: '#e5e5ff',
          signal_path: '../img/march/HighRiseGlass0105_download600.jpg',
          signal_size: '1000%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#e5e5ff',
          signal_font_color: '#000033',
          signal_font_shadow: '#e5e5ff',
          display_path: '../img/march/glassLightLeft.jpg',
          input_size: '1000%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#e5e5ff',
          input_font_color: '#000033',
          input_font_shadow: '#e5e5ff',
          output_size: '1000%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#e5e5ff',
          output_font_color: '#000033',
          output_font_shadow: '#e5e5ff',
          gain_display_size: '200%',
          gain_display_repeat: 'no-repeat',
          gain_display_box_shadow_color: '#e5e5ff',
          gain_display_font_color: '#000033',
          gain_volume_size: '100%',
          gain_volume_repeat: 'no-repeat',
          gain_volume_box_shadow: '#e5e5ff',
          gain_slider_path: '../img/march/glassLightLeft.jpg',
          gain_modulator_select_path: '../img/march/glassLightLeft.jpg',
          gain_modulator_select_size: '100%',
          gain_modulator_select_repeat: 'no-repeat',
          gain_modulator_select_box_shadow_color: '#e5e5ff',
          gain_modulator_edit_box_shadow_color: '#e5e5ff',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 10,
          name: 'Gain: April A',
          month: 'april',
          rule: {
            "dates": [ 1, 2, 3, 6, 7, 11, 12, 16, 21, 26 ]
          },
          face_path: '../img/april/levi-xu-125529-unsplash.jpg',
          face_size: '150%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ffff46',
          face_font_color: '#191902',
          face_font_shadow: '#ffff46',
          top_path: '../img/april/amritanshu-sikdar-268167-unsplash.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#191902',
          top_font_shadow: '#ffff46',
          signal_path: '../img/april/amritanshu-sikdar-268167-unsplash.jpg',
          signal_size: '1100%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ffff46',
          signal_font_color: '#191902',
          signal_font_shadow: '#ffff46',
          display_path: '../img/april/samuel-scrimshaw-166751-unsplash.jpg',
          input_size: '1000%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ffff46',
          input_font_color: '#191902',
          input_font_shadow: '#ffff46',
          output_size: '1000%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ffff46',
          output_font_color: '#191902',
          output_font_shadow: '#ffff46',
          gain_display_size: '200%',
          gain_display_repeat: 'no-repeat',
          gain_display_box_shadow_color: '#ffff46',
          gain_display_font_color: '#191902',
          gain_volume_size: '100%',
          gain_volume_repeat: 'no-repeat',
          gain_volume_box_shadow: '#ffff46',
          gain_slider_path: '../img/april/samuel-scrimshaw-166751-unsplash.jpg',
          gain_modulator_select_path: '../img/april/samuel-scrimshaw-166751-unsplash.jpg',
          gain_modulator_select_size: '100%',
          gain_modulator_select_repeat: 'no-repeat',
          gain_modulator_select_box_shadow_color: '#ffff46',
          gain_modulator_edit_box_shadow_color: '#ffff46',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 11,
          name: 'Gain: April B',
          month: 'april',
          rule: {
            "dates": [ 4, 8, 9, 13, 17, 22, 23, 24, 27, 28 ]
          },
          face_path: '../img/april/sime-basioli-181541-unsplash.jpg',
          face_size: '150%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ad3232',
          face_font_color: '#1e0000',
          face_font_shadow: '#ad3232',
          top_path: '../img/april/muneeb-syed-276300-unsplash.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#1e0000',
          top_font_shadow: '#ad3232',
          signal_path: '../img/april/muneeb-syed-276300-unsplash.jpg',
          signal_size: '1100%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ad3232',
          signal_font_color: '#1e0000',
          signal_font_shadow: '#ad3232',
          display_path: '../img/april/sakura-618700-unsplash.jpg',
          input_size: '1000%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ad3232',
          input_font_color: '#1e0000',
          input_font_shadow: '#ad3232',
          output_size: '1000%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ad3232',
          output_font_color: '#1e0000',
          output_font_shadow: '#ad3232',
          gain_display_size: '200%',
          gain_display_repeat: 'no-repeat',
          gain_display_box_shadow_color: '#ad3232',
          gain_display_font_color: '#1e0000',
          gain_volume_size: '100%',
          gain_volume_repeat: 'no-repeat',
          gain_volume_box_shadow: '#ad3232',
          gain_slider_path: '../img/april/sakura-618700-unsplash.jpg',
          gain_modulator_select_path: '../img/april/sakura-618700-unsplash.jpg',
          gain_modulator_select_size: '100%',
          gain_modulator_select_repeat: 'no-repeat',
          gain_modulator_select_box_shadow_color: '#ad3232',
          gain_modulator_edit_box_shadow_color: '#ad3232',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 12,
          name: 'Gain: April C',
          month: 'april',
          rule: {
            "dates": [ 5, 10, 14, 15, 18, 19, 20, 25, 29, 30 ]
          },
          face_path: '../img/april/ripples-640872_1920.jpg',
          face_size: '150%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#adadff',
          face_font_color: '#0a0a33',
          face_font_shadow: '#adadff',
          top_path: '../img/april/drop-of-water-1131759_1920.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#0a0a33',
          top_font_shadow: '#adadff',
          signal_path: '../img/april/drop-of-water-1131759_1920.jpg',
          signal_size: '1100%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#adadff',
          signal_font_color: '#0a0a33',
          signal_font_shadow: '#adadff',
          display_path: '../img/april/water-1945995_1920.jpg',
          input_size: '1000%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#adadff',
          input_font_color: '#0a0a33',
          input_font_shadow: '#adadff',
          output_size: '1000%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#adadff',
          output_font_color: '#0a0a33',
          output_font_shadow: '#adadff',
          gain_display_size: '100%',
          gain_display_repeat: 'no-repeat',
          gain_display_box_shadow_color: '#adadff',
          gain_display_font_color: '#0a0a33',
          gain_volume_size: '100%',
          gain_volume_repeat: 'no-repeat',
          gain_volume_box_shadow: '#adadff',
          gain_slider_path: '../img/april/water-1945995_1920.jpg',
          gain_modulator_select_path: '../img/april/water-1945995_1920.jpg',
          gain_modulator_select_size: '200%',
          gain_modulator_select_repeat: 'no-repeat',
          gain_modulator_select_box_shadow_color: '#adadff',
          gain_modulator_edit_box_shadow_color: '#adadff',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('gain_skins_id_seq', (SELECT MAX(id) FROM gain_skins));");
    });
};
