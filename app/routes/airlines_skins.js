'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('airlines_skins')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('airlines_skins')
    .select()
    .where('id', req.params.id)
    .first()
    .then((volume) => {
      if (!volume) {
        return next();
      }

      res.send(volume);
    })
    .catch((err) => {
      next(err);
    });
});


router.post('/', (req, res, next) => {
  knex('airlines_skins')
  .insert({
    name: req.body.name,
    month: req.body.month,
    rule: req.body.rule,
    face_path: req.body.face_path,
    face_size: req.body.face_size,
    face_repeat: req.body.face_repeat,
    face_box_shadow_color: req.body.face_box_shadow_color,
    face_font_color: req.body.face_font_color,
    face_font_shadow_color: req.body.face_font_shadow_color,
    top_path: req.body.top_path,
    top_size: req.body.top_size,
    top_repeat: req.body.top_repeat,
    top_font_color: req.body.top_font_color,
    top_font_shadow_color: req.body.top_font_shadow_color,
    signal_path: req.body.signal_path,
    signal_size: req.body.signal_size,
    signal_repeat: req.body.signal_repeat,
    signal_box_shadow_color: req.body.signal_box_shadow_color,
    signal_font_color: req.body.signal_font_color,
    signal_font_shadow_color: req.body.signal_font_shadow_color,
    display_path: req.body.display_path,
    output_size: req.body.output_size,
    output_repeat: req.body.output_repeat,
    output_box_shadow_color: req.body.output_box_shadow_color,
    output_font_color: req.body.output_font_color,
    output_font_shadow_color: req.body.output_font_shadow_color,
    flight_table_list_display: req.body.flight_table_list_display,
    flight_table_list_size: req.body.flight_table_list_size,
    flight_table_list_repeat: req.body.flight_table_list_repeat,
    airline_callsign_display: req.body.airline_callsign_display,
    airline_callsign_size: req.body.airline_callsign_size,
    airline_callsign_repeat: req.body.airline_callsign_repeat,
    departure_city_data_display: req.body.departure_city_data_display,
    departure_city_data_size: req.body.departure_city_data_size,
    departure_city_data_repeat: req.body.departure_city_data_repeat,
    arrival_city_data_display: req.body.arrival_city_data_display,
    arrival_city_data_size: req.body.arrival_city_data_size,
    arrival_city_data_repeat: req.body.arrival_city_data_repeat,
    current_location_display: req.body.current_location_display,
    current_location_size: req.body.current_location_size,
    current_location_repeat: req.body.current_location_repeat,
    slider_shader_color_1: req.body.slider_shader_color_1,
    slider_shader_color_2: req.body.slider_shader_color_2
  }, '*')
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
});


router.patch('/:id', (req, res, next) => {
  knex('airlines_skins')
  .where('id', req.params.id)
  .update({
    name: req.body.name,
    month: req.body.month,
    rule: req.body.rule,
    face_path: req.body.face_path,
    face_size: req.body.face_size,
    face_repeat: req.body.face_repeat,
    face_box_shadow_color: req.body.face_box_shadow_color,
    face_font_color: req.body.face_font_color,
    face_font_shadow_color: req.body.face_font_shadow_color,
    top_path: req.body.top_path,
    top_size: req.body.top_size,
    top_repeat: req.body.top_repeat,
    top_font_color: req.body.top_font_color,
    top_font_shadow_color: req.body.top_font_shadow_color,
    signal_path: req.body.signal_path,
    signal_size: req.body.signal_size,
    signal_repeat: req.body.signal_repeat,
    signal_box_shadow_color: req.body.signal_box_shadow_color,
    signal_font_color: req.body.signal_font_color,
    signal_font_shadow_color: req.body.signal_font_shadow_color,
    display_path: req.body.display_path,
    output_size: req.body.output_size,
    output_repeat: req.body.output_repeat,
    output_box_shadow_color: req.body.output_box_shadow_color,
    output_font_color: req.body.output_font_color,
    output_font_shadow_color: req.body.output_font_shadow_color,
    flight_table_list_display: req.body.flight_table_list_display,
    flight_table_list_size: req.body.flight_table_list_size,
    flight_table_list_repeat: req.body.flight_table_list_repeat,
    airline_callsign_display: req.body.airline_callsign_display,
    airline_callsign_size: req.body.airline_callsign_size,
    airline_callsign_repeat: req.body.airline_callsign_repeat,
    departure_city_data_display: req.body.departure_city_data_display,
    departure_city_data_size: req.body.departure_city_data_size,
    departure_city_data_repeat: req.body.departure_city_data_repeat,
    arrival_city_data_display: req.body.arrival_city_data_display,
    arrival_city_data_size: req.body.arrival_city_data_size,
    arrival_city_data_repeat: req.body.arrival_city_data_repeat,
    current_location_display: req.body.current_location_display,
    current_location_size: req.body.current_location_size,
    current_location_repeat: req.body.current_location_repeat,
    slider_shader_color_1: req.body.slider_shader_color_1,
    slider_shader_color_2: req.body.slider_shader_color_2,
    updated_at: req.body.updated_at
  }, '*')
    .then((results)=>{
       res.status(200).send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/:id', (req, res, next) => {
    let record;

      knex('airlines_skins')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('airlines_skins')
            .del()
            .where('id', req.params.id);
        })
        .then(() => {
          var holder = record.id;
          delete record.id;

          var obj = {
            id: holder,
            name: record.name,
            month: record.month,
            rule: record.rule,
            face_path: record.face_path,
            face_size: record.face_size,
            face_repeat: record.face_repeat,
            face_box_shadow_color: record.face_box_shadow_color,
            face_font_color: record.face_font_color,
            face_font_shadow_color: record.face_font_shadow_color,
            top_path: record.top_path,
            top_size: record.top_size,
            top_repeat: record.top_repeat,
            top_font_color: record.top_font_color,
            top_font_shadow_color: record.top_font_shadow_color,
            signal_path: record.signal_path,
            signal_size: record.signal_size,
            signal_repeat: record.signal_repeat,
            signal_box_shadow_color: record.signal_box_shadow_color,
            signal_font_color: record.signal_font_color,
            signal_font_shadow_color: record.signal_font_shadow_color,
            display_path: record.display_path,
            output_size: record.output_size,
            output_repeat: record.output_repeat,
            output_box_shadow_color: record.output_box_shadow_color,
            output_font_color: record.output_font_color,
            output_font_shadow_color: record.output_font_shadow_color,
            flight_table_list_display: record.flight_table_list_display,
            flight_table_list_size: record.flight_table_list_size,
            flight_table_list_repeat: record.flight_table_list_repeat,
            airline_callsign_display: record.airline_callsign_display,
            airline_callsign_size: record.airline_callsign_size,
            airline_callsign_repeat: record.airline_callsign_repeat,
            departure_city_data_display: record.departure_city_data_display,
            departure_city_data_size: record.departure_city_data_size,
            departure_city_data_repeat: record.departure_city_data_repeat,
            arrival_city_data_display: record.arrival_city_data_display,
            arrival_city_data_size: record.arrival_city_data_size,
            arrival_city_data_repeat: record.arrival_city_data_repeat,
            current_location_display: record.current_location_display,
            current_location_size: record.current_location_size,
            current_location_repeat: record.current_location_repeat,
            slider_shader_color_1: record.slider_shader_color_1,
            slider_shader_color_2: record.slider_shader_color_2,
            created_at: record.created_at,
            updated_at: record.updated_at
          };

          res.send(obj);
        })
        .catch((err) => {
          next(err);
        });
    });




module.exports = router;
