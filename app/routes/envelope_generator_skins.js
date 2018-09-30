'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('envelope_generator_skins')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('envelope_generator_skins')
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
  knex('envelope_generator_skins')
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
    vertical_meter_background_color: req.body.vertical_meter_background_color,
    vertical_meter_outline_background_color: req.body.vertical_meter_outline_background_color,
    vertical_meter_shadow_color: req.body.vertical_meter_shadow_color,
    output_size: req.body.output_size,
    output_repeat: req.body.output_repeat,
    output_box_shadow_color: req.body.output_box_shadow_color,
    output_font_color: req.body.output_font_color,
    envelope_input_display_path: req.body.envelope_input_display_path,
    envelope_input_display_size: req.body.envelope_input_display_size,
    envelope_input_display_repeat: req.body.envelope_input_display_repeat,
    slope_amount_path: req.body.slope_amount_path,
    slope_amount_size: req.body.slope_amount_size,
    slope_amount_repeat: req.body.slope_amount_repeat,
    release_slope_amount_path: req.body.release_slope_amount_path,
    release_slope_amount_size: req.body.release_slope_amount_size,
    release_slope_amount_repeat: req.body.release_slope_amount_repeat,
    decay_slope_amount_path: req.body.decay_slope_amount_path,
    decay_slope_amount_size: req.body.decay_slope_amount_size,
    decay_slope_amount_repeat: req.body.decay_slope_amount_repeat,
    post_sustain_slope_amount_path: req.body.post_sustain_slope_amount_path,
    post_sustain_slope_amount_size: req.body.post_sustain_slope_amount_size,
    post_sustain_slope_amount_repeat: req.body.post_sustain_slope_amount_repeat,
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
  knex('envelope_generator_skins')
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
    vertical_meter_background_color: req.body.vertical_meter_background_color,
    vertical_meter_outline_background_color: req.body.vertical_meter_outline_background_color,
    vertical_meter_shadow_color: req.body.vertical_meter_shadow_color,
    output_size: req.body.output_size,
    output_repeat: req.body.output_repeat,
    output_box_shadow_color: req.body.output_box_shadow_color,
    output_font_color: req.body.output_font_color,
    envelope_input_display_path: req.body.envelope_input_display_path,
    envelope_input_display_size: req.body.envelope_input_display_size,
    envelope_input_display_repeat: req.body.envelope_input_display_repeat,
    slope_amount_path: req.body.slope_amount_path,
    slope_amount_size: req.body.slope_amount_size,
    slope_amount_repeat: req.body.slope_amount_repeat,
    release_slope_amount_path: req.body.release_slope_amount_path,
    release_slope_amount_size: req.body.release_slope_amount_size,
    release_slope_amount_repeat: req.body.release_slope_amount_repeat,
    decay_slope_amount_path: req.body.decay_slope_amount_path,
    decay_slope_amount_size: req.body.decay_slope_amount_size,
    decay_slope_amount_repeat: req.body.decay_slope_amount_repeat,
    post_sustain_slope_amount_path: req.body.post_sustain_slope_amount_path,
    post_sustain_slope_amount_size: req.body.post_sustain_slope_amount_size,
    post_sustain_slope_amount_repeat: req.body.post_sustain_slope_amount_repeat,
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

      knex('envelope_generator_skins')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('envelope_generator_skins')
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
            vertical_meter_background_color: record.vertical_meter_background_color,
            vertical_meter_outline_background_color: record.vertical_meter_outline_background_color,
            vertical_meter_shadow_color: record.vertical_meter_shadow_color,
            output_size: record.output_size,
            output_repeat: record.output_repeat,
            output_box_shadow_color: record.output_box_shadow_color,
            output_font_color: record.output_font_color,
            envelope_input_display_path: record.envelope_input_display_path,
            envelope_input_display_size: record.envelope_input_display_size,
            envelope_input_display_repeat: record.envelope_input_display_repeat,
            slope_amount_path: record.slope_amount_path,
            slope_amount_size: record.slope_amount_size,
            slope_amount_repeat: record.slope_amount_repeat,
            release_slope_amount_path: record.release_slope_amount_path,
            release_slope_amount_size: record.release_slope_amount_size,
            release_slope_amount_repeat: record.release_slope_amount_repeat,
            decay_slope_amount_path: record.decay_slope_amount_path,
            decay_slope_amount_size: record.decay_slope_amount_size,
            decay_slope_amount_repeat: record.decay_slope_amount_repeat,
            post_sustain_slope_amount_path: record.post_sustain_slope_amount_path,
            post_sustain_slope_amount_size: record.post_sustain_slope_amount_size,
            post_sustain_slope_amount_repeat: record.post_sustain_slope_amount_repeat,
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
