'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('master_volume_skins')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('master_volume_skins')
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
  knex('master_volume_skins')
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
    input_size: req.body.input_size,
    input_repeat: req.body.input_repeat,
    input_box_shadow_color: req.body.input_box_shadow_color,
    input_font_color: req.body.input_font_color,
    input_font_shadow: req.body.input_font_shadow,
    display_span_color: req.body.display_span_color,
    gain_display_size: req.body.gain_display_size,
    gain_display_repeat: req.body.gain_display_repeat,
    gain_display_box_shadow_color: req.body.gain_display_box_shadow_color,
    gain_display_font_color: req.body.gain_display_font_color,
    master_volume_size: req.body.master_volume_size,
    master_volume_repeat: req.body.master_volume_repeat,
    master_volume_box_shadow: req.body.master_volume_box_shadow,
    slider_background_image: req.body.slider_background_image
  }, '*')
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
});


router.patch('/:id', (req, res, next) => {
  knex('master_volume_skins')
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
    input_size: req.body.input_size,
    input_repeat: req.body.input_repeat,
    input_box_shadow_color: req.body.input_box_shadow_color,
    input_font_color: req.body.input_font_color,
    input_font_shadow: req.body.input_font_shadow,
    display_span_color: req.body.display_span_color,
    gain_display_size: req.body.gain_display_size,
    gain_display_repeat: req.body.gain_display_repeat,
    gain_display_box_shadow_color: req.body.gain_display_box_shadow_color,
    gain_display_font_color: req.body.gain_display_font_color,
    master_volume_size: req.body.master_volume_size,
    master_volume_repeat: req.body.master_volume_repeat,
    master_volume_box_shadow: req.body.master_volume_box_shadow,
    slider_background_image: req.body.slider_background_image
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

      knex('master_volume_skins')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('master_volume_skins')
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
            input_size: record.input_size,
            input_repeat: record.input_repeat,
            input_box_shadow_color: record.input_box_shadow_color,
            input_font_color: record.input_font_color,
            input_font_shadow: record.input_font_shadow,
            display_span_color: record.display_span_color,
            gain_display_size: record.gain_display_size,
            gain_display_repeat: record.gain_display_repeat,
            gain_display_box_shadow_color: record.gain_display_box_shadow_color,
            gain_display_font_color: record.gain_display_font_color,
            master_volume_size: record.master_volume_size,
            master_volume_repeat: record.master_volume_repeat,
            master_volume_box_shadow: record.master_volume_box_shadow,
            slider_background_image: record.slider_background_image,
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
