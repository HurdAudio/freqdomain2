'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('oscillator_skins').del()
    .then(function () {
      // Inserts seed entries
      return knex('oscillator_skins').insert([
        {
          id: 1,
          name: 'Oscillator: January A',
          month: 'january',
          rule: {
            "dates": [ 1, 2, 3, 6, 7, 11, 12, 16, 21, 26, 31 ]
          },
          face_path: '../img/january/oscillatorJanAFace.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#cc0066',
          face_font_color: '#000000',
          face_font_shadow: '#cc0066',
          top_path: '../img/january/oscillatorJanASignal.jpg',
          top_size: '110%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#cc0066',
          signal_path: '../img/january/oscillatorJanASignal.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#cc0066',
          signal_font_color: '#000000',
          signal_font_shadow: '#cc0066',
          display_path: '../img/january/oscillatorJanADisplay.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#cc0066',
          output_font_color: '#000000',
          output_font_shadow: '#cc0066',
          waveform_selector_display_size: '100%',
          waveform_selector_display_repeat: 'no-repeat',
          waveform_selector_display_box_shadow_color: '#cc0066',
          waveform_selector_display_font_color: '#000000',
          frequency_size: '100%',
          frequency_repeat: 'no-repeat',
          frequency_box_shadow: '#cc0066',
          frequency_slider_path: '../img/january/oscillatorJanADisplay.jpg',
          frequency_slider_size: '40%',
          frequency_slider_repeat: 'no-repeat',
          frequency_slider_box_shadow: '#cc0066',
          frequency_modulator_select_path: '../img/january/oscillatorJanADisplay.jpg',
          frequency_modulator_select_size: '200%',
          frequency_modulator_select_repeat: 'no-repeat',
          frequency_modulator_select_box_shadow_color: '#cc0066',
          waveform_modulator_select_path: '../img/january/oscillatorJanADisplay.jpg',
          waveform_modulator_select_size: '100%',
          waveform_modulator_select_repeat: 'no-repeat',
          waveform_modulator_select_box_shadow_color: '#cc0066',
          detune_path: '../img/january/oscillatorJanADisplay.jpg',
          detune_size: '100%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#cc0066',
          detune_slider_path: '../img/january/oscillatorJanADisplay.jpg',
          detune_slider_size: '500%',
          detune_slider_repeat: 'no-repeat',
          detune_slider_box_shadow_color: '#cc0066',
          detune_modulator_path: '../img/january/oscillatorJanADisplay.jpg',
          detune_modulator_size: '100%',
          detune_modulator_repeat: 'no-repeat',
          detune_modulator_box_shadow_color: '#cc0066',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 2,
          name: 'Oscillator: January B',
          month: 'january',
          rule: {
            "dates": [ 4, 8, 9, 13, 17, 22, 23, 24, 27, 28 ]
          },
          face_path: '../img/january/oscillatorfaceJanb.jpg',
          face_size: '140%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#D2691E',
          face_font_color: '#000000',
          face_font_shadow: '#D2691E',
          top_path: '../img/january/ws_Cool_Ice_Block_1920x1200.jpg',
          top_size: '70%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#D2691E',
          signal_path: '../img/january/ws_Cool_Ice_Block_1920x1200.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#D2691E',
          signal_font_color: '#000000',
          signal_font_shadow: '#D2691E',
          display_path: '../img/january/oscillatorDisplayJanb.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#D2691E',
          output_font_color: '#000000',
          output_font_shadow: '#D2691E',
          waveform_selector_display_size: '100%',
          waveform_selector_display_repeat: 'no-repeat',
          waveform_selector_display_box_shadow_color: '#D2691E',
          waveform_selector_display_font_color: '#000000',
          frequency_size: '100%',
          frequency_repeat: 'no-repeat',
          frequency_box_shadow: '#D2691E',
          frequency_slider_path: '../img/january/oscillatorDisplayJanb.jpg',
          frequency_slider_size: '400%',
          frequency_slider_repeat: 'no-repeat',
          frequency_slider_box_shadow: '#D2691E',
          frequency_modulator_select_path: '../img/january/oscillatorDisplayJanb.jpg',
          frequency_modulator_select_size: '200%',
          frequency_modulator_select_repeat: 'no-repeat',
          frequency_modulator_select_box_shadow_color: '#D2691E',
          waveform_modulator_select_path: '../img/january/oscillatorDisplayJanb.jpg',
          waveform_modulator_select_size: '100%',
          waveform_modulator_select_repeat: 'no-repeat',
          waveform_modulator_select_box_shadow_color: '#D2691E',
          detune_path: '../img/january/oscillatorDisplayJanb.jpg',
          detune_size: '100%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#D2691E',
          detune_slider_path: '../img/january/oscillatorDisplayJanb.jpg',
          detune_slider_size: '500%',
          detune_slider_repeat: 'no-repeat',
          detune_slider_box_shadow_color: '#D2691E',
          detune_modulator_path: '../img/january/oscillatorDisplayJanb.jpg',
          detune_modulator_size: '100%',
          detune_modulator_repeat: 'no-repeat',
          detune_modulator_box_shadow_color: '#D2691E',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 3,
          name: 'Oscillator: January C',
          month: 'january',
          rule: {
            "dates": [ 5, 10, 14, 15, 18, 19, 20, 25, 29, 30 ]
          },
          face_path: '../img/january/depositphotos_40318089-stock-photo-blue-ice-texture-background.jpg',
          face_size: '120%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#FF003F',
          face_font_color: '#000000',
          face_font_shadow: '#FF003F',
          top_path: '../img/january/sky_blue_faux_fur_or_feathers_by_sweetsoulsister.jpg',
          top_size: '70%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#FF003F',
          signal_path: '../img/january/sky_blue_faux_fur_or_feathers_by_sweetsoulsister.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#FF003F',
          signal_font_color: '#000000',
          signal_font_shadow: '#FF003F',
          display_path: '../img/january/oscJanuaryCDisplays.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#FF003F',
          output_font_color: '#000000',
          output_font_shadow: '#FF003F',
          waveform_selector_display_size: '100%',
          waveform_selector_display_repeat: 'no-repeat',
          waveform_selector_display_box_shadow_color: '#FF003F',
          waveform_selector_display_font_color: '#000000',
          frequency_size: '100%',
          frequency_repeat: 'no-repeat',
          frequency_box_shadow: '#FF003F',
          frequency_slider_path: '../img/january/oscJanuaryCDisplays.jpg',
          frequency_slider_size: '400%',
          frequency_slider_repeat: 'no-repeat',
          frequency_slider_box_shadow: '#FF003F',
          frequency_modulator_select_path: '../img/january/oscJanuaryCDisplays.jpg',
          frequency_modulator_select_size: '200%',
          frequency_modulator_select_repeat: 'no-repeat',
          frequency_modulator_select_box_shadow_color: '#FF003F',
          waveform_modulator_select_path: '../img/january/oscJanuaryCDisplays.jpg',
          waveform_modulator_select_size: '100%',
          waveform_modulator_select_repeat: 'no-repeat',
          waveform_modulator_select_box_shadow_color: '#FF003F',
          detune_path: '../img/january/oscJanuaryCDisplays.jpg',
          detune_size: '100%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#FF003F',
          detune_slider_path: '../img/january/oscJanuaryCDisplays.jpg',
          detune_slider_size: '500%',
          detune_slider_repeat: 'no-repeat',
          detune_slider_box_shadow_color: '#FF003F',
          detune_modulator_path: '../img/january/oscJanuaryCDisplays.jpg',
          detune_modulator_size: '100%',
          detune_modulator_repeat: 'no-repeat',
          detune_modulator_box_shadow_color: '#FF003F',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 4,
          name: 'Oscillator: February A',
          month: 'february',
          rule: {
            "dates": [ 1, 3, 5, 7, 9, 11, 13, 17, 21, 27 ]
          },
          face_path: '../img/february/silkpurple.jpg',
          face_size: '120%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#26FF26',
          face_font_color: '#000000',
          face_font_shadow: '#26FF26',
          top_path: '../img/february/line_shadow_shape_light_39001_3840x2400.jpg',
          top_size: '70%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#26FF26',
          signal_path: '../img/february/line_shadow_shape_light_39001_3840x2400.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#26FF26',
          signal_font_color: '#000000',
          signal_font_shadow: '#26FF26',
          display_path: '../img/february/0014-silk-wallpaper-texture-seamless-hr.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#26FF26',
          output_font_color: '#000000',
          output_font_shadow: '#26FF26',
          waveform_selector_display_size: '100%',
          waveform_selector_display_repeat: 'no-repeat',
          waveform_selector_display_box_shadow_color: '#26FF26',
          waveform_selector_display_font_color: '#000000',
          frequency_size: '100%',
          frequency_repeat: 'no-repeat',
          frequency_box_shadow: '#26FF26',
          frequency_slider_path: '../img/february/0014-silk-wallpaper-texture-seamless-hr.jpg',
          frequency_slider_size: '400%',
          frequency_slider_repeat: 'no-repeat',
          frequency_slider_box_shadow: '#26FF26',
          frequency_modulator_select_path: '../img/february/0014-silk-wallpaper-texture-seamless-hr.jpg',
          frequency_modulator_select_size: '200%',
          frequency_modulator_select_repeat: 'no-repeat',
          frequency_modulator_select_box_shadow_color: '#26FF26',
          waveform_modulator_select_path: '../img/february/0014-silk-wallpaper-texture-seamless-hr.jpg',
          waveform_modulator_select_size: '100%',
          waveform_modulator_select_repeat: 'no-repeat',
          waveform_modulator_select_box_shadow_color: '#26FF26',
          detune_path: '../img/february/0014-silk-wallpaper-texture-seamless-hr.jpg',
          detune_size: '100%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#26FF26',
          detune_slider_path: '../img/february/0014-silk-wallpaper-texture-seamless-hr.jpg',
          detune_slider_size: '500%',
          detune_slider_repeat: 'no-repeat',
          detune_slider_box_shadow_color: '#26FF26',
          detune_modulator_path: '../img/february/0014-silk-wallpaper-texture-seamless-hr.jpg',
          detune_modulator_size: '100%',
          detune_modulator_repeat: 'no-repeat',
          detune_modulator_box_shadow_color: '#26FF26',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 5,
          name: 'Oscillator: February B',
          month: 'february',
          rule: {
            "dates": [ 2, 4, 8, 15, 19, 22, 23, 25, 28, 29 ]
          },
          face_path: '../img/february/oscillatorfebbface.jpg',
          face_size: '120%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#4c4c07',
          face_font_color: '#FFFF19',
          face_font_shadow: '#4c4c07',
          top_path: '../img/february/4044$Fuschia_z.jpg',
          top_size: '70%',
          top_repeat: 'no-repeat',
          top_font_color: '#FFFF19',
          top_font_shadow: '#4c4c07',
          signal_path: '../img/february/4044$Fuschia_z.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#4c4c07',
          signal_font_color: '#FFFF19',
          signal_font_shadow: '#4c4c07',
          display_path: '../img/february/graphicstock-white-background-abstract-cloth-wavy-folds-of-textile-texture-wallpaper-design-of-elegant-fabric-silk-square-format_HthKT1tKW_thumb.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#4c4c07',
          output_font_color: '#FFFF19',
          output_font_shadow: '#4c4c07',
          waveform_selector_display_size: '100%',
          waveform_selector_display_repeat: 'no-repeat',
          waveform_selector_display_box_shadow_color: '#4c4c07',
          waveform_selector_display_font_color: '#FFFF19',
          frequency_size: '100%',
          frequency_repeat: 'no-repeat',
          frequency_box_shadow: '#4c4c07',
          frequency_slider_path: '../img/february/graphicstock-white-background-abstract-cloth-wavy-folds-of-textile-texture-wallpaper-design-of-elegant-fabric-silk-square-format_HthKT1tKW_thumb.jpg',
          frequency_slider_size: '400%',
          frequency_slider_repeat: 'no-repeat',
          frequency_slider_box_shadow: '#4c4c07',
          frequency_modulator_select_path: '../img/february/graphicstock-white-background-abstract-cloth-wavy-folds-of-textile-texture-wallpaper-design-of-elegant-fabric-silk-square-format_HthKT1tKW_thumb.jpg',
          frequency_modulator_select_size: '200%',
          frequency_modulator_select_repeat: 'no-repeat',
          frequency_modulator_select_box_shadow_color: '#4c4c07',
          waveform_modulator_select_path: '../img/february/graphicstock-white-background-abstract-cloth-wavy-folds-of-textile-texture-wallpaper-design-of-elegant-fabric-silk-square-format_HthKT1tKW_thumb.jpg',
          waveform_modulator_select_size: '100%',
          waveform_modulator_select_repeat: 'no-repeat',
          waveform_modulator_select_box_shadow_color: '#4c4c07',
          detune_path: '../img/february/graphicstock-white-background-abstract-cloth-wavy-folds-of-textile-texture-wallpaper-design-of-elegant-fabric-silk-square-format_HthKT1tKW_thumb.jpg',
          detune_size: '100%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#4c4c07',
          detune_slider_path: '../img/february/graphicstock-white-background-abstract-cloth-wavy-folds-of-textile-texture-wallpaper-design-of-elegant-fabric-silk-square-format_HthKT1tKW_thumb.jpg',
          detune_slider_size: '500%',
          detune_slider_repeat: 'no-repeat',
          detune_slider_box_shadow_color: '#4c4c07',
          detune_modulator_path: '../img/february/graphicstock-white-background-abstract-cloth-wavy-folds-of-textile-texture-wallpaper-design-of-elegant-fabric-silk-square-format_HthKT1tKW_thumb.jpg',
          detune_modulator_size: '100%',
          detune_modulator_repeat: 'no-repeat',
          detune_modulator_box_shadow_color: '#4c4c07',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 6,
          name: 'Oscillator: February C',
          month: 'february',
          rule: {
            "dates": [ 6, 10, 12, 14, 16, 18, 20, 24, 26 ]
          },
          face_path: '../img/february/silk-wallpaper-20076-20650-hd-wallpapers.jpg',
          face_size: '120%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#013300',
          face_font_color: '#000000',
          face_font_shadow: '#013300',
          top_path: '../img/february/pinkishHue.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#000000',
          top_font_shadow: '#013300',
          signal_path: '../img/february/pinkishHue.jpg',
          signal_size: '1300%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#013300',
          signal_font_color: '#000000',
          signal_font_shadow: '#013300',
          display_path: '../img/february/silk-fabric-texture-15.jpg',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#013300',
          output_font_color: '#000000',
          output_font_shadow: '#013300',
          waveform_selector_display_size: '100%',
          waveform_selector_display_repeat: 'no-repeat',
          waveform_selector_display_box_shadow_color: '#013300',
          waveform_selector_display_font_color: '#000000',
          frequency_size: '100%',
          frequency_repeat: 'no-repeat',
          frequency_box_shadow: '#013300',
          frequency_slider_path: '../img/february/silk-fabric-texture-15.jpg',
          frequency_slider_size: '400%',
          frequency_slider_repeat: 'no-repeat',
          frequency_slider_box_shadow: '#013300',
          frequency_modulator_select_path: '../img/february/silk-fabric-texture-15.jpg',
          frequency_modulator_select_size: '200%',
          frequency_modulator_select_repeat: 'no-repeat',
          frequency_modulator_select_box_shadow_color: '#013300',
          waveform_modulator_select_path: '../img/february/silk-fabric-texture-15.jpg',
          waveform_modulator_select_size: '100%',
          waveform_modulator_select_repeat: 'no-repeat',
          waveform_modulator_select_box_shadow_color: '#013300',
          detune_path: '../img/february/silk-fabric-texture-15.jpg',
          detune_size: '100%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#013300',
          detune_slider_path: '../img/february/silk-fabric-texture-15.jpg',
          detune_slider_size: '500%',
          detune_slider_repeat: 'no-repeat',
          detune_slider_box_shadow_color: '#013300',
          detune_modulator_path: '../img/february/silk-fabric-texture-15.jpg',
          detune_modulator_size: '100%',
          detune_modulator_repeat: 'no-repeat',
          detune_modulator_box_shadow_color: '#013300',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('oscillator_skins_id_seq', (SELECT MAX(id) FROM oscillator_skins));");
    });
};
