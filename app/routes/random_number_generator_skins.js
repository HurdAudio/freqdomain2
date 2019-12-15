'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('random_number_generator_skins')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('random_number_generator_skins')
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
  knex('random_number_generator_skins')
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
    output_display_size: req.body.output_display_size,
    output_display_repeat: req.body.output_display_repeat,
    output_display_box_shadow_color: req.body.output_display_box_shadow_color,
    output_display_font_color: req.body.output_display_font_color,
    minimum_display_path: req.body.minimum_display_path,
    minimum_display_size: req.body.minimum_display_size,
    minimum_display_repeat: req.body.minimum_display_repeat,
    minimum_display_box_shadow_color: req.body.minimum_display_box_shadow_color,
    minimum_slider_path: req.body.minimum_slider_path,
    minimum_slider_size: req.body.minimum_slider_size,
    minimum_slider_repeat: req.body.minimum_slider_repeat,
    minimum_slider_box_shadow_color: req.body.minimum_slider_box_shadow_color,
    minimum_modulator_path: req.body.minimum_modulator_path,
    minimum_modulator_size: req.body.minimum_modulator_size,
    minimum_modulator_repeat: req.body.minimum_modulator_repeat,
    minimum_modulator_box_shadow_color: req.body.minimum_modulator_box_shadow_color,
    maximum_display_path: req.body.maximum_display_path,
    maximum_display_size: req.body.maximum_display_size,
    maximum_display_repeat: req.body.maximum_display_repeat,
    maximum_display_box_shadow_color: req.body.maximum_display_box_shadow_color,
    maximum_slider_path: req.body.maximum_slider_path,
    maximum_slider_size: req.body.maximum_slider_size,
    maximum_slider_repeat: req.body.maximum_slider_repeat,
    maximum_slider_box_shadow_color: req.body.maximum_slider_box_shadow_color,
    maximum_modulator_path: req.body.maximum_modulator_path,
    maximum_modulator_size: req.body.maximum_modulator_size,
    maximum_modulator_repeat: req.body.maximum_modulator_repeat,
    maximum_modulator_box_shadow_color: req.body.maximum_modulator_box_shadow_color,
    interval_display_path: req.body.interval_display_path,
    interval_display_size: req.body.interval_display_size,
    interval_display_repeat: req.body.interval_display_repeat,
    interval_display_box_shadow_color: req.body.interval_display_box_shadow_color,
    interval_slider_path: req.body.interval_slider_path,
    interval_slider_size: req.body.interval_slider_size,
    interval_slider_repeat: req.body.interval_slider_repeat,
    interval_slider_box_shadow_color: req.body.interval_slider_box_shadow_color,
    interval_modulator_path: req.body.interval_modulator_path,
    interval_modulator_size: req.body.interval_modulator_size,
    interval_modulator_repeat: req.body.interval_modulator_repeat,
    interval_modulator_box_shadow_color: req.body.interval_modulator_box_shadow_color,
    slope_display_path: req.body.slope_display_path,
    slope_display_size: req.body.slope_display_size,
    slope_display_repeat: req.body.slope_display_repeat,
    slope_display_box_shadow_color: req.body.slope_display_box_shadow_color,
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
  knex('random_number_generator_skins')
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
    output_display_size: req.body.output_display_size,
    output_display_repeat: req.body.output_display_repeat,
    output_display_box_shadow_color: req.body.output_display_box_shadow_color,
    output_display_font_color: req.body.output_display_font_color,
    minimum_display_path: req.body.minimum_display_path,
    minimum_display_size: req.body.minimum_display_size,
    minimum_display_repeat: req.body.minimum_display_repeat,
    minimum_display_box_shadow_color: req.body.minimum_display_box_shadow_color,
    minimum_slider_path: req.body.minimum_slider_path,
    minimum_slider_size: req.body.minimum_slider_size,
    minimum_slider_repeat: req.body.minimum_slider_repeat,
    minimum_slider_box_shadow_color: req.body.minimum_slider_box_shadow_color,
    minimum_modulator_path: req.body.minimum_modulator_path,
    minimum_modulator_size: req.body.minimum_modulator_size,
    minimum_modulator_repeat: req.body.minimum_modulator_repeat,
    minimum_modulator_box_shadow_color: req.body.minimum_modulator_box_shadow_color,
    maximum_display_path: req.body.maximum_display_path,
    maximum_display_size: req.body.maximum_display_size,
    maximum_display_repeat: req.body.maximum_display_repeat,
    maximum_display_box_shadow_color: req.body.maximum_display_box_shadow_color,
    maximum_slider_path: req.body.maximum_slider_path,
    maximum_slider_size: req.body.maximum_slider_size,
    maximum_slider_repeat: req.body.maximum_slider_repeat,
    maximum_slider_box_shadow_color: req.body.maximum_slider_box_shadow_color,
    maximum_modulator_path: req.body.maximum_modulator_path,
    maximum_modulator_size: req.body.maximum_modulator_size,
    maximum_modulator_repeat: req.body.maximum_modulator_repeat,
    maximum_modulator_box_shadow_color: req.body.maximum_modulator_box_shadow_color,
    interval_display_path: req.body.interval_display_path,
    interval_display_size: req.body.interval_display_size,
    interval_display_repeat: req.body.interval_display_repeat,
    interval_display_box_shadow_color: req.body.interval_display_box_shadow_color,
    interval_slider_path: req.body.interval_slider_path,
    interval_slider_size: req.body.interval_slider_size,
    interval_slider_repeat: req.body.interval_slider_repeat,
    interval_slider_box_shadow_color: req.body.interval_slider_box_shadow_color,
    interval_modulator_path: req.body.interval_modulator_path,
    interval_modulator_size: req.body.interval_modulator_size,
    interval_modulator_repeat: req.body.interval_modulator_repeat,
    interval_modulator_box_shadow_color: req.body.interval_modulator_box_shadow_color,
    slope_display_path: req.body.slope_display_path,
    slope_display_size: req.body.slope_display_size,
    slope_display_repeat: req.body.slope_display_repeat,
    slope_display_box_shadow_color: req.body.slope_display_box_shadow_color,
    slider_shader_color_1: req.body.slider_shader_color_1,
    slider_shader_color_2: req.body.slider_shader_color_2
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

      knex('random_number_generator_skins')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('random_number_generator_skins')
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
            output_display_size: record.output_display_size,
            output_display_repeat: record.output_display_repeat,
            output_display_box_shadow_color: record.output_display_box_shadow_color,
            output_display_font_color: record.output_display_font_color,
            minimum_display_path: record.minimum_display_path,
            minimum_display_size: record.minimum_display_size,
            minimum_display_repeat: record.minimum_display_repeat,
            minimum_display_box_shadow_color: record.minimum_display_box_shadow_color,
            minimum_slider_path: record.minimum_slider_path,
            minimum_slider_size: record.minimum_slider_size,
            minimum_slider_repeat: record.minimum_slider_repeat,
            minimum_slider_box_shadow_color: record.minimum_slider_box_shadow_color,
            minimum_modulator_path: record.minimum_modulator_path,
            minimum_modulator_size: record.minimum_modulator_size,
            minimum_modulator_repeat: record.minimum_modulator_repeat,
            minimum_modulator_box_shadow_color: record.minimum_modulator_box_shadow_color,
            maximum_display_path: record.maximum_display_path,
            maximum_display_size: record.maximum_display_size,
            maximum_display_repeat: record.maximum_display_repeat,
            maximum_display_box_shadow_color: record.maximum_display_box_shadow_color,
            maximum_slider_path: record.maximum_slider_path,
            maximum_slider_size: record.maximum_slider_size,
            maximum_slider_repeat: record.maximum_slider_repeat,
            maximum_slider_box_shadow_color: record.maximum_slider_box_shadow_color,
            maximum_modulator_path: record.maximum_modulator_path,
            maximum_modulator_size: record.maximum_modulator_size,
            maximum_modulator_repeat: record.maximum_modulator_repeat,
            maximum_modulator_box_shadow_color: record.maximum_modulator_box_shadow_color,
            interval_display_path: record.interval_display_path,
            interval_display_size: record.interval_display_size,
            interval_display_repeat: record.interval_display_repeat,
            interval_display_box_shadow_color: record.interval_display_box_shadow_color,
            interval_slider_path: record.interval_slider_path,
            interval_slider_size: record.interval_slider_size,
            interval_slider_repeat: record.interval_slider_repeat,
            interval_slider_box_shadow_color: record.interval_slider_box_shadow_color,
            interval_modulator_path: record.interval_modulator_path,
            interval_modulator_size: record.interval_modulator_size,
            interval_modulator_repeat: record.interval_modulator_repeat,
            interval_modulator_box_shadow_color: record.interval_modulator_box_shadow_color,
            slope_display_path: record.slope_display_path,
            slope_display_size: record.slope_display_size,
            slope_display_repeat: record.slope_display_repeat,
            slope_display_box_shadow_color: record.slope_display_box_shadow_color,
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
