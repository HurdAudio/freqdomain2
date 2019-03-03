'use strict';
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('lowshelf_filter_skins').del()
    .then(function () {
      // Inserts seed entries
      return knex('lowshelf_filter_skins').insert([
        {
          id: 1,
          name: 'Lowshelf Filter: January A',
          month: 'january',
          rule: {
            "dates": [ 1, 2, 4, 7, 10, 11, 12, 14, 21, 22, 31  ]
          },
          face_path: '../img/january/transparent-ice-blue-color-frozen-rough-63994382.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ffc04c',
          face_font_color: '#332100',
          face_font_shadow_color: '#ffc04c',
          top_path: '../img/january/icyimagesgalore.jpeg',
          top_size: '110%',
          top_repeat: 'no-repeat',
          top_font_color: '#332100',
          top_font_shadow_color: '#ffc04c',
          signal_path: '../img/january/icyimagesgalore.jpeg',
          signal_size: '2000%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ffc04c',
          signal_font_color: '#332100',
          signal_font_shadow_color: '#ffc04c',
          display_path: '../img/january/melting--ice.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ffc04c',
          input_font_color: '#332100',
          input_font_shadow_color: '#ffc04c',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ffc04c',
          output_font_color: '#332100',
          output_font_shadow_color: '#ffc04c',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#ffc04c',
          frequency_display_font_color: '#332100',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#ffc04c',
          detune_font_color: '#332100',
          gain_size: '300%',
          gain_repeat: 'no-repeat',
          gain_box_shadow_color: '#ffc04c',
          gain_font_color: '#332100',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '300%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#e59400',
          slider_shader_color_2: '#C0C0C0',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 2,
          name: 'Lowshelf Filter: January B',
          month: 'january',
          rule: {
            "dates": [ 3, 5, 6, 13, 15, 23, 24, 25, 26, 27 ]
          },
          face_path: '../img/january/ice-background-24-1080x675.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ff3232',
          face_font_color: '#190505',
          face_font_shadow_color: '#ff3232',
          top_path: '../img/january/texture-paint-500x500.jpeg',
          top_size: '110%',
          top_repeat: 'no-repeat',
          top_font_color: '#190505',
          top_font_shadow_color: '#ff3232',
          signal_path: '../img/january/texture-paint-500x500.jpeg',
          signal_size: '2000%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ff3232',
          signal_font_color: '#190505',
          signal_font_shadow_color: '#ff3232',
          display_path: '../img/january/e695b428d3540428a8cd9f4e2f3bb5df.png',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ff3232',
          input_font_color: '#190505',
          input_font_shadow_color: '#ff3232',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ff3232',
          output_font_color: '#190505',
          output_font_shadow_color: '#ff3232',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#ff3232',
          frequency_display_font_color: '#190505',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#ff3232',
          detune_font_color: '#190505',
          gain_size: '300%',
          gain_repeat: 'no-repeat',
          gain_box_shadow_color: '#ff3232',
          gain_font_color: '#190505',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '100%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#ffd6d6',
          slider_shader_color_2: '#7f1919',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 3,
          name: 'Lowshelf Filter: January C',
          month: 'january',
          rule: {
            "dates": [ 8, 9, 16, 17, 18, 19, 20, 28, 29, 30 ]
          },
          face_path: '../img/january/IMG_288572.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ffff19',
          face_font_color: '#333300',
          face_font_shadow_color: '#ffff19',
          top_path: '../img/january/2846274-awesome-ice-wallpapers.jpg',
          top_size: '110%',
          top_repeat: 'no-repeat',
          top_font_color: '#333300',
          top_font_shadow_color: '#ffff19',
          signal_path: '../img/january/2846274-awesome-ice-wallpapers.jpg',
          signal_size: '2000%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ffff19',
          signal_font_color: '#333300',
          signal_font_shadow_color: '#ffff19',
          display_path: '../img/january/ahspdfoihef.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ffff19',
          input_font_color: '#333300',
          input_font_shadow_color: '#ffff19',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ffff19',
          output_font_color: '#333300',
          output_font_shadow_color: '#ffff19',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#ffff19',
          frequency_display_font_color: '#333300',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#ffff19',
          detune_font_color: '#333300',
          gain_size: '300%',
          gain_repeat: 'no-repeat',
          gain_box_shadow_color: '#ffff19',
          gain_font_color: '#333300',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '100%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#b2b200',
          slider_shader_color_2: '#ffffcc',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 4,
          name: 'Lowshelf Filter: February A',
          month: 'february',
          rule: {
            "dates": [ 1, 2, 3, 6, 7, 11, 12, 16, 21, 26 ]
          },
          face_path: '../img/february/kenan-suleymanoglu-762145-unsplash.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#0000ff',
          face_font_color: '#000033',
          face_font_shadow_color: '#0000ff',
          top_path: '../img/february/annie-spratt-695484-unsplash.jpg',
          top_size: '110%',
          top_repeat: 'no-repeat',
          top_font_color: '#000033',
          top_font_shadow_color: '#0000ff',
          signal_path: '../img/february/annie-spratt-695484-unsplash.jpg',
          signal_size: '2000%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#0000ff',
          signal_font_color: '#000033',
          signal_font_shadow_color: '#0000ff',
          display_path: '../img/february/justine-camacho-790381-unsplash.jpg',
          input_size: '600%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#0000ff',
          input_font_color: '#000033',
          input_font_shadow_color: '#0000ff',
          output_size: '600%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#0000ff',
          output_font_color: '#000033',
          output_font_shadow_color: '#0000ff',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#0000ff',
          frequency_display_font_color: '#000033',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#0000ff',
          detune_font_color: '#000033',
          gain_size: '300%',
          gain_repeat: 'no-repeat',
          gain_box_shadow_color: '#0000ff',
          gain_font_color: '#000033',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '100%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#00007f',
          slider_shader_color_2: '#ccccff',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 5,
          name: 'Lowshelf Filter: February B',
          month: 'february',
          rule: {
            "dates": [ 4, 8, 9, 13, 17, 22, 23, 24, 27, 28 ]
          },
          face_path: '../img/february/red-2937905_1920.jpg',
          face_size: '110%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#ffff32',
          face_font_color: '#333300',
          face_font_shadow_color: '#ffff32',
          top_path: '../img/february/green-2940573_1920.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#333300',
          top_font_shadow_color: '#ffff32',
          signal_path: '../img/february/green-2940573_1920.jpg',
          signal_size: '2000%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#ffff32',
          signal_font_color: '#333300',
          signal_font_shadow_color: '#ffff32',
          display_path: '../img/february/white-2940476_1920.jpg',
          input_size: '300%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#ffff32',
          input_font_color: '#333300',
          input_font_shadow_color: '#ffff32',
          output_size: '300%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#ffff32',
          output_font_color: '#333300',
          output_font_shadow_color: '#ffff32',
          frequency_display_size: '300%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#ffff32',
          frequency_display_font_color: '#333300',
          detune_size: '300%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#ffff32',
          detune_font_color: '#333300',
          gain_size: '300%',
          gain_repeat: 'no-repeat',
          gain_box_shadow_color: '#ffff32',
          gain_font_color: '#333300',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '100%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#191900',
          slider_shader_color_2: '#ffff99',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        },
        {
          id: 6,
          name: 'Lowshelf Filter: February C',
          month: 'february',
          rule: {
            "dates": [ 5, 10, 14, 15, 18, 19, 20, 25, 29 ]
          },
          face_path: '../img/february/dj-paine-565506-unsplash.jpg',
          face_size: '100%',
          face_repeat: 'no-repeat',
          face_box_shadow_color: '#1919ff',
          face_font_color: '#00004c',
          face_font_shadow_color: '#1919ff',
          top_path: '../img/february/fabric-2306731_1920.jpg',
          top_size: '100%',
          top_repeat: 'no-repeat',
          top_font_color: '#00004c',
          top_font_shadow_color: '#1919ff',
          signal_path: '../img/february/fabric-2306731_1920.jpg',
          signal_size: '2000%',
          signal_repeat: 'no-repeat',
          signal_box_shadow_color: '#1919ff',
          signal_font_color: '#00004c',
          signal_font_shadow_color: '#1919ff',
          display_path: '../img/february/background-20632_1920.jpg',
          input_size: '300%',
          input_repeat: 'no-repeat',
          input_box_shadow_color: '#1919ff',
          input_font_color: '#00004c',
          input_font_shadow_color: '#1919ff',
          output_size: '300%',
          output_repeat: 'no-repeat',
          output_box_shadow_color: '#1919ff',
          output_font_color: '#00004c',
          output_font_shadow_color: '#1919ff',
          frequency_display_size: '100%',
          frequency_display_repeat: 'no-repeat',
          frequency_display_box_shadow_color: '#1919ff',
          frequency_display_font_color: '#00004c',
          detune_size: '100%',
          detune_repeat: 'no-repeat',
          detune_box_shadow_color: '#1919ff',
          detune_font_color: '#00004c',
          gain_size: '100%',
          gain_repeat: 'no-repeat',
          gain_box_shadow_color: '#1919ff',
          gain_font_color: '#00004c',
          mod_select_size: '300%',
          mod_repeat_value: 'no-repeat',
          slider_size: '100%',
          slide_repeat_value: 'no-repeat',
          slider_shader_color_1: '#000099',
          slider_shader_color_2: '#e5e5ff',
          created_at: new Date('2017-07-20T13:44:00.000Z'),
          updated_at: new Date('2017-07-20T13:44:00.000Z')
        }
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('lowshelf_filter_skins_id_seq', (SELECT MAX(id) FROM lowshelf_filter_skins));");
    });
};
