'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('test_tone_skins')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('test_tone_skins')
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
  knex('test_tone_skins')
  .insert({
    name: req.body.name,
    month: req.body.month,
    rule: req.body.rule,
    face_path: req.body.face_path,
    face_size: req.body.face_size,
    face_repeat: req.body.face_repeat,
    face_box_shadow_color: req.body.face_box_shadow_color,
    face_font_color: req.body.face_font_color,
    face_font_shadow: req.body.face_font_shadow,
    top_path: req.body.top_path,
    top_size: req.body.top_size,
    top_repeat: req.body.top_repeat,
    top_font_color: req.body.top_font_color,
    top_font_shadow: req.body.top_font_shadow,
    signal_path: req.body.signal_path,
    signal_size: req.body.signal_size,
    signal_repeat: req.body.signal_repeat,
    signal_box_shadow_color: req.body.signal_box_shadow_color,
    signal_font_color: req.body.signal_font_color,
    signal_font_shadow: req.body.signal_font_shadow,
    display_path: req.body.display_path,
    output_size: req.body.output_size,
    output_repeat: req.body.output_repeat,
    output_box_shadow_color: req.body.output_box_shadow_color,
    output_font_color: req.body.output_font_color,
    output_font_shadow: req.body.output_font_shadow,
    waveform_selector_display_size: req.body.waveform_selector_display_size,
    waveform_selector_display_repeat: req.body.waveform_selector_display_repeat,
    waveform_selector_display_box_shadow_color: req.body.waveform_selector_display_box_shadow_color,
    waveform_selector_display_font_color: req.body.waveform_selector_display_font_color,
    frequency_size: req.body.frequency_size,
    frequency_repeat: req.body.frequency_repeat,
    frequency_box_shadow: req.body.frequency_box_shadow,
    frequency_slider_path: req.body.frequency_slider_path,
    frequency_slider_size: req.body.frequency_slider_size,
    frequency_slider_repeat: req.body.frequency_slider_repeat,
    frequency_slider_box_shadow: req.body.frequency_slider_box_shadow,
    volume_path: req.body.volume_path,
    volume_size: req.body.volume_size,
    volume_repeat: req.body.volume_repeat,
    volume_box_shadow_color: req.body.volume_box_shadow_color,
    volume_slider_path: req.body.volume_slider_path,
    volume_slider_size: req.body.volume_slider_size,
    volume_slider_repeat: req.body.volume_slider_repeat,
    volume_slider_box_shadow_color: req.body.volume_slider_box_shadow_color,
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
  knex('test_tone_skins')
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
    face_font_shadow: req.body.face_font_shadow,
    top_path: req.body.top_path,
    top_size: req.body.top_size,
    top_repeat: req.body.top_repeat,
    top_font_color: req.body.top_font_color,
    top_font_shadow: req.body.top_font_shadow,
    signal_path: req.body.signal_path,
    signal_size: req.body.signal_size,
    signal_repeat: req.body.signal_repeat,
    signal_box_shadow_color: req.body.signal_box_shadow_color,
    signal_font_color: req.body.signal_font_color,
    signal_font_shadow: req.body.signal_font_shadow,
    display_path: req.body.display_path,
    output_size: req.body.output_size,
    output_repeat: req.body.output_repeat,
    output_box_shadow_color: req.body.output_box_shadow_color,
    output_font_color: req.body.output_font_color,
    output_font_shadow: req.body.output_font_shadow,
    waveform_selector_display_size: req.body.waveform_selector_display_size,
    waveform_selector_display_repeat: req.body.waveform_selector_display_repeat,
    waveform_selector_display_box_shadow_color: req.body.waveform_selector_display_box_shadow_color,
    waveform_selector_display_font_color: req.body.waveform_selector_display_font_color,
    frequency_size: req.body.frequency_size,
    frequency_repeat: req.body.frequency_repeat,
    frequency_box_shadow: req.body.frequency_box_shadow,
    frequency_slider_path: req.body.frequency_slider_path,
    frequency_slider_size: req.body.frequency_slider_size,
    frequency_slider_repeat: req.body.frequency_slider_repeat,
    frequency_slider_box_shadow: req.body.frequency_slider_box_shadow,
    volume_path: req.body.volume_path,
    volume_size: req.body.volume_size,
    volume_repeat: req.body.volume_repeat,
    volume_box_shadow_color: req.body.volume_box_shadow_color,
    volume_slider_path: req.body.volume_slider_path,
    volume_slider_size: req.body.volume_slider_size,
    volume_slider_repeat: req.body.volume_slider_repeat,
    volume_slider_box_shadow_color: req.body.volume_slider_box_shadow_color,
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

      knex('test_tone_skins')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('test_tone_skins')
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
            face_font_shadow: record.face_font_shadow,
            top_path: record.top_path,
            top_size: record.top_size,
            top_repeat: record.top_repeat,
            top_font_color: record.top_font_color,
            top_font_shadow: record.top_font_shadow,
            signal_path: record.signal_path,
            signal_size: record.signal_size,
            signal_repeat: record.signal_repeat,
            signal_box_shadow_color: record.signal_box_shadow_color,
            signal_font_color: record.signal_font_color,
            signal_font_shadow: record.signal_font_shadow,
            display_path: record.display_path,
            output_size: record.output_size,
            output_repeat: record.output_repeat,
            output_box_shadow_color: record.output_box_shadow_color,
            output_font_color: record.output_font_color,
            output_font_shadow: record.output_font_shadow,
            waveform_selector_display_size: record.waveform_selector_display_size,
            waveform_selector_display_repeat: record.waveform_selector_display_repeat,
            waveform_selector_display_box_shadow_color: record.waveform_selector_display_box_shadow_color,
            waveform_selector_display_font_color: record.waveform_selector_display_font_color,
            frequency_size: record.frequency_size,
            frequency_repeat: record.frequency_repeat,
            frequency_box_shadow: record.frequency_box_shadow,
            frequency_slider_path: record.frequency_slider_path,
            frequency_slider_size: record.frequency_slider_size,
            frequency_slider_repeat: record.frequency_slider_repeat,
            frequency_slider_box_shadow: record.frequency_slider_box_shadow,
            volume_path: record.volume_path,
            volume_size: record.volume_size,
            volume_repeat: record.volume_repeat,
            volume_box_shadow_color: record.volume_box_shadow_color,
            volume_slider_path: record.volume_slider_path,
            volume_slider_size: record.volume_slider_size,
            volume_slider_repeat: record.volume_slider_repeat,
            volume_slider_box_shadow_color: record.volume_slider_box_shadow_color,
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
