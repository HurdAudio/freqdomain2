'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('dynamic_compressor_skins')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('dynamic_compressor_skins')
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
  knex('dynamic_compressor_skins')
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
    threshold_display_size: req.body.threshold_display_size,
    threshold_display_repeat: req.body.threshold_display_repeat,
    threshold_display_box_shadow_color: req.body.threshold_display_box_shadow_color,
    threshold_display_font_color: req.body.threshold_display_font_color,
    threshold_slider_path: req.body.threshold_slider_path,
    threshold_slider_size: req.body.threshold_slider_size,
    threshold_slider_repeat: req.body.threshold_slider_repeat,
    threshold_slider_box_shadow_color: req.body.threshold_slider_box_shadow_color,
    knee_display_path: req.body.knee_display_path,
    knee_display_size: req.body.knee_display_size,
    knee_repeat: req.body.knee_repeat,
    knee_box_shadow: req.body.knee_box_shadow,
    knee_display_font_color: req.body.knee_display_font_color,
    knee_slider_path: req.body.knee_slider_path,
    knee_slider_size: req.body.knee_slider_size,
    knee_slider_repeat: req.body.knee_slider_repeat,
    knee_slider_box_shadow: req.body.knee_slider_box_shadow,
    ratio_display_path: req.body.ratio_display_path,
    ratio_display_size: req.body.ratio_display_size,
    ratio_display_repeat: req.body.ratio_display_repeat,
    ratio_display_box_shadow_color: req.body.ratio_display_box_shadow_color,
    ratio_display_font_color: req.body.ratio_display_font_color,
    ratio_slider_path: req.body.ratio_slider_path,
    ratio_slider_size: req.body.ratio_slider_size,
    ratio_slider_repeat: req.body.ratio_slider_repeat,
    ratio_slider_box_shadow_color: req.body.ratio_slider_box_shadow_color,
    attack_display_path: req.body.attack_display_path,
    attack_display_size: req.body.attack_display_size,
    attack_display_repeat: req.body.attack_display_repeat,
    attack_display_box_shadow_color: req.body.attack_display_box_shadow_color,
    attack_display_font_color: req.body.attack_display_font_color,
    attack_slider_path: req.body.attack_slider_path,
    attack_slider_size: req.body.attack_slider_size,
    attack_slider_repeat: req.body.attack_slider_repeat,
    attack_slider_box_shadow_color: req.body.attack_slider_box_shadow_color,
    release_display_path: req.body.release_display_path,
    release_display_size: req.body.release_display_size,
    release_display_repeat: req.body.release_display_repeat,
    release_display_box_shadow_color: req.body.release_display_box_shadow_color,
    release_display_font_color: req.body.release_display_font_color,
    release_slider_path: req.body.release_slider_path,
    release_slider_size: req.body.release_slider_size,
    release_slider_repeat: req.body.release_slider_repeat,
    release_slider_box_shadow_color: req.body.release_slider_box_shadow_color,
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
  knex('dynamic_compressor_skins')
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
    threshold_display_size: req.body.threshold_display_size,
    threshold_display_repeat: req.body.threshold_display_repeat,
    threshold_display_box_shadow_color: req.body.threshold_display_box_shadow_color,
    threshold_display_font_color: req.body.threshold_display_font_color,
    threshold_slider_path: req.body.threshold_slider_path,
    threshold_slider_size: req.body.threshold_slider_size,
    threshold_slider_repeat: req.body.threshold_slider_repeat,
    threshold_slider_box_shadow_color: req.body.threshold_slider_box_shadow_color,
    knee_display_path: req.body.knee_display_path,
    knee_display_size: req.body.knee_display_size,
    knee_repeat: req.body.knee_repeat,
    knee_box_shadow: req.body.knee_box_shadow,
    knee_display_font_color: req.body.knee_display_font_color,
    knee_slider_path: req.body.knee_slider_path,
    knee_slider_size: req.body.knee_slider_size,
    knee_slider_repeat: req.body.knee_slider_repeat,
    knee_slider_box_shadow: req.body.knee_slider_box_shadow,
    ratio_display_path: req.body.ratio_display_path,
    ratio_display_size: req.body.ratio_display_size,
    ratio_display_repeat: req.body.ratio_display_repeat,
    ratio_display_box_shadow_color: req.body.ratio_display_box_shadow_color,
    ratio_display_font_color: req.body.ratio_display_font_color,
    ratio_slider_path: req.body.ratio_slider_path,
    ratio_slider_size: req.body.ratio_slider_size,
    ratio_slider_repeat: req.body.ratio_slider_repeat,
    ratio_slider_box_shadow_color: req.body.ratio_slider_box_shadow_color,
    attack_display_path: req.body.attack_display_path,
    attack_display_size: req.body.attack_display_size,
    attack_display_repeat: req.body.attack_display_repeat,
    attack_display_box_shadow_color: req.body.attack_display_box_shadow_color,
    attack_display_font_color: req.body.attack_display_font_color,
    attack_slider_path: req.body.attack_slider_path,
    attack_slider_size: req.body.attack_slider_size,
    attack_slider_repeat: req.body.attack_slider_repeat,
    attack_slider_box_shadow_color: req.body.attack_slider_box_shadow_color,
    release_display_path: req.body.release_display_path,
    release_display_size: req.body.release_display_size,
    release_display_repeat: req.body.release_display_repeat,
    release_display_box_shadow_color: req.body.release_display_box_shadow_color,
    release_display_font_color: req.body.release_display_font_color,
    release_slider_path: req.body.release_slider_path,
    release_slider_size: req.body.release_slider_size,
    release_slider_repeat: req.body.release_slider_repeat,
    release_slider_box_shadow_color: req.body.release_slider_box_shadow_color,
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

      knex('dynamic_compressor_skins')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('dynamic_compressor_skins')
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
            threshold_display_size: record.threshold_display_size,
            threshold_display_repeat: record.threshold_display_repeat,
            threshold_display_box_shadow_color: record.threshold_display_box_shadow_color,
            threshold_display_font_color: record.threshold_display_font_color,
            threshold_slider_path: record.threshold_slider_path,
            threshold_slider_size: record.threshold_slider_size,
            threshold_slider_repeat: record.threshold_slider_repeat,
            threshold_slider_box_shadow_color: record.threshold_slider_box_shadow_color,
            knee_display_path: record.knee_display_path,
            knee_display_size: record.knee_display_size,
            knee_repeat: record.knee_repeat,
            knee_box_shadow: record.knee_box_shadow,
            knee_display_font_color: record.knee_display_font_color,
            knee_slider_path: record.knee_slider_path,
            knee_slider_size: record.knee_slider_size,
            knee_slider_repeat: record.knee_slider_repeat,
            knee_slider_box_shadow: record.knee_slider_box_shadow,
            ratio_display_path: record.ratio_display_path,
            ratio_display_size: record.ratio_display_size,
            ratio_display_repeat: record.ratio_display_repeat,
            ratio_display_box_shadow_color: record.ratio_display_box_shadow_color,
            ratio_display_font_color: record.ratio_display_font_color,
            ratio_slider_path: record.ratio_slider_path,
            ratio_slider_size: record.ratio_slider_size,
            ratio_slider_repeat: record.ratio_slider_repeat,
            ratio_slider_box_shadow_color: record.ratio_slider_box_shadow_color,
            attack_display_path: record.attack_display_path,
            attack_display_size: record.attack_display_size,
            attack_display_repeat: record.attack_display_repeat,
            attack_display_box_shadow_color: record.attack_display_box_shadow_color,
            attack_display_font_color: record.attack_display_font_color,
            attack_slider_path: record.attack_slider_path,
            attack_slider_size: record.attack_slider_size,
            attack_slider_repeat: record.attack_slider_repeat,
            attack_slider_box_shadow_color: record.attack_slider_box_shadow_color,
            release_display_path: record.release_display_path,
            release_display_size: record.release_display_size,
            release_display_repeat: record.release_display_repeat,
            release_display_box_shadow_color: record.release_display_box_shadow_color,
            release_display_font_color: record.release_display_font_color,
            release_slider_path: record.release_slider_path,
            release_slider_size: record.release_slider_size,
            release_slider_repeat: record.release_slider_repeat,
            release_slider_box_shadow_color: record.release_slider_box_shadow_color,
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
