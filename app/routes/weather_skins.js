'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('weather_skins')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('weather_skins')
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
  knex('weather_skins')
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
    input_path: req.body.input_path,
    input_size: req.body.input_size,
    input_repeat: req.body.input_repeat,
    zip_user_input_path: req.body.zip_user_input_path,
    zip_user_input_size: req.body.zip_user_input_size,
    zip_user_input_repeat: req.body.zip_user_input_repeat,
    zip_modulator_text_shadow_color: req.body.zip_modulator_text_shadow_color,
    block_path: req.body.block_path,
    block_size: req.body.block_size,
    block_repeat: req.body.block_repeat,
    block_box_shadow_color: req.body.block_box_shadow_color,
    block_font_color: req.body.block_font_color,
    webcam_block_path: req.body.webcam_block_path,
    webcam_block_display_size: req.body.webcam_block_display_size,
    webcam_block_repeat: req.body.webcam_block_repeat,
    webcam_block_box_shadow_color: req.body.webcam_block_box_shadow_color,
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
  knex('weather_skins')
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
    input_path: req.body.input_path,
    input_size: req.body.input_size,
    input_repeat: req.body.input_repeat,
    zip_user_input_path: req.body.zip_user_input_path,
    zip_user_input_size: req.body.zip_user_input_size,
    zip_user_input_repeat: req.body.zip_user_input_repeat,
    zip_modulator_text_shadow_color: req.body.zip_modulator_text_shadow_color,
    block_path: req.body.block_path,
    block_size: req.body.block_size,
    block_repeat: req.body.block_repeat,
    block_box_shadow_color: req.body.block_box_shadow_color,
    block_font_color: req.body.block_font_color,
    webcam_block_path: req.body.webcam_block_path,
    webcam_block_display_size: req.body.webcam_block_display_size,
    webcam_block_repeat: req.body.webcam_block_repeat,
    webcam_block_box_shadow_color: req.body.webcam_block_box_shadow_color,
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

      knex('weather_skins')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('weather_skins')
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
            input_path: record.input_path,
            input_size: record.input_size,
            input_repeat: record.input_repeat,
            zip_user_input_path: record.zip_user_input_path,
            zip_user_input_size: record.zip_user_input_size,
            zip_user_input_repeat: record.zip_user_input_repeat,
            zip_modulator_text_shadow_color: record.zip_modulator_text_shadow_color,
            block_path: record.block_path,
            block_size: record.block_size,
            block_repeat: record.block_repeat,
            block_box_shadow_color: record.block_box_shadow_color,
            block_font_color: record.block_font_color,
            webcam_block_path: record.webcam_block_path,
            webcam_block_display_size: record.webcam_block_display_size,
            webcam_block_repeat: record.webcam_block_repeat,
            webcam_block_box_shadow_color: record.webcam_block_box_shadow_color,
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
