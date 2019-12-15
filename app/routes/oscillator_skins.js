'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('oscillator_skins')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('oscillator_skins')
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
  knex('oscillator_skins')
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
    frequency_modulator_select_path: req.body.frequency_modulator_select_path,
    frequency_modulator_select_size: req.body.frequency_modulator_select_size,
    frequency_modulator_select_repeat: req.body.frequency_modulator_select_repeat,
    frequency_modulator_select_box_shadow_color: req.body.frequency_modulator_select_box_shadow_color,
    waveform_modulator_select_path: req.body.waveform_modulator_select_path,
    waveform_modulator_select_size: req.body.waveform_modulator_select_size,
    waveform_modulator_select_repeat: req.body.waveform_modulator_select_repeat,
    waveform_modulator_select_box_shadow_color: req.body.waveform_modulator_select_box_shadow_color,
    detune_path: req.body.detune_path,
    detune_size: req.body.detune_size,
    detune_repeat: req.body.detune_repeat,
    detune_box_shadow_color: req.body.detune_box_shadow_color,
    detune_slider_path: req.body.detune_slider_path,
    detune_slider_size: req.body.detune_slider_size,
    detune_slider_repeat: req.body.detune_slider_repeat,
    detune_slider_box_shadow_color: req.body.detune_slider_box_shadow_color,
    detune_modulator_path: req.body.detune_modulator_path,
    detune_modulator_size: req.body.detune_modulator_size,
    detune_modulator_repeat: req.body.detune_modulator_repeat,
    detune_modulator_box_shadow_color: req.body.detune_modulator_box_shadow_color
  }, '*')
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
});


router.patch('/:id', (req, res, next) => {
  knex('oscillator_skins')
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
    frequency_modulator_select_path: req.body.frequency_modulator_select_path,
    frequency_modulator_select_size: req.body.frequency_modulator_select_size,
    frequency_modulator_select_repeat: req.body.frequency_modulator_select_repeat,
    frequency_modulator_select_box_shadow_color: req.body.frequency_modulator_select_box_shadow_color,
    waveform_modulator_select_path: req.body.waveform_modulator_select_path,
    waveform_modulator_select_size: req.body.waveform_modulator_select_size,
    waveform_modulator_select_repeat: req.body.waveform_modulator_select_repeat,
    waveform_modulator_select_box_shadow_color: req.body.waveform_modulator_select_box_shadow_color,
    detune_path: req.body.detune_path,
    detune_size: req.body.detune_size,
    detune_repeat: req.body.detune_repeat,
    detune_box_shadow_color: req.body.detune_box_shadow_color,
    detune_slider_path: req.body.detune_slider_path,
    detune_slider_size: req.body.detune_slider_size,
    detune_slider_repeat: req.body.detune_slider_repeat,
    detune_slider_box_shadow_color: req.body.detune_slider_box_shadow_color,
    detune_modulator_path: req.body.detune_modulator_path,
    detune_modulator_size: req.body.detune_modulator_size,
    detune_modulator_repeat: req.body.detune_modulator_repeat,
    detune_modulator_box_shadow_color: req.body.detune_modulator_box_shadow_color
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

      knex('oscillator_skins')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('oscillator_skins')
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
            frequency_modulator_select_path: record.frequency_modulator_select_path,
            frequency_modulator_select_size: record.frequency_modulator_select_size,
            frequency_modulator_select_repeat: record.frequency_modulator_select_repeat,
            frequency_modulator_select_box_shadow_color: record.frequency_modulator_select_box_shadow_color,
            waveform_modulator_select_path: record.waveform_modulator_select_path,
            waveform_modulator_select_size: record.waveform_modulator_select_size,
            waveform_modulator_select_repeat: record.waveform_modulator_select_repeat,
            waveform_modulator_select_box_shadow_color: record.waveform_modulator_select_box_shadow_color,
            detune_path: record.detune_path,
            detune_size: record.detune_size,
            detune_repeat: record.detune_repeat,
            detune_box_shadow_color: record.detune_box_shadow_color,
            detune_slider_path: record.detune_slider_path,
            detune_slider_size: record.detune_slider_size,
            detune_slider_repeat: record.detune_slider_repeat,
            detune_slider_box_shadow_color: record.detune_slider_box_shadow_color,
            detune_modulator_path: record.detune_modulator_path,
            detune_modulator_size: record.detune_modulator_size,
            detune_modulator_repeat: record.detune_modulator_repeat,
            detune_modulator_box_shadow_color: record.detune_modulator_box_shadow_color,
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
