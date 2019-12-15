'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('delay_skins')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('delay_skins')
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
  knex('delay_skins')
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
    input_size: req.body.input_size,
    input_repeat: req.body.input_repeat,
    input_box_shadow_color: req.body.input_box_shadow_color,
    input_font_color: req.body.input_font_color,
    input_font_shadow_color: req.body.input_font_shadow_color,
    output_size: req.body.output_size,
    output_repeat: req.body.output_repeat,
    output_box_shadow_color: req.body.output_box_shadow_color,
    output_font_color: req.body.output_font_color,
    output_font_shadow_color: req.body.output_font_shadow_color,
    delay_display_size: req.body.delay_display_size,
    delay_display_repeat: req.body.delay_display_repeat,
    delay_display_box_shadow_color: req.body.delay_display_box_shadow_color,
    delay_display_font_color: req.body.delay_display_font_color,
    delay_slider_size: req.body.delay_slider_size,
    delay_slider_repeat: req.body.delay_slider_repeat,
    delay_slider_box_shadow_color: req.body.delay_slider_box_shadow_color,
    delay_slider_font_color: req.body.delay_slider_font_color,
    mod_select_size: req.body.mod_select_size,
    mod_repeat_value: req.body.mod_repeat_value,
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
  knex('delay_skins')
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
    input_size: req.body.input_size,
    input_repeat: req.body.input_repeat,
    input_box_shadow_color: req.body.input_box_shadow_color,
    input_font_color: req.body.input_font_color,
    input_font_shadow_color: req.body.input_font_shadow_color,
    output_size: req.body.output_size,
    output_repeat: req.body.output_repeat,
    output_box_shadow_color: req.body.output_box_shadow_color,
    output_font_color: req.body.output_font_color,
    output_font_shadow_color: req.body.output_font_shadow_color,
    delay_display_size: req.body.delay_display_size,
    delay_display_repeat: req.body.delay_display_repeat,
    delay_display_box_shadow_color: req.body.delay_display_box_shadow_color,
    delay_display_font_color: req.body.delay_display_font_color,
    delay_slider_size: req.body.delay_slider_size,
    delay_slider_repeat: req.body.delay_slider_repeat,
    delay_slider_box_shadow_color: req.body.delay_slider_box_shadow_color,
    delay_slider_font_color: req.body.delay_slider_font_color,
    mod_select_size: req.body.mod_select_size,
    mod_repeat_value: req.body.mod_repeat_value,
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

      knex('delay_skins')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('delay_skins')
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
            input_size: record.input_size,
            input_repeat: record.input_repeat,
            input_box_shadow_color: record.input_box_shadow_color,
            input_font_color: record.input_font_color,
            input_font_shadow_color: record.input_font_shadow_color,
            output_size: record.output_size,
            output_repeat: record.output_repeat,
            output_box_shadow_color: record.output_box_shadow_color,
            output_font_color: record.output_font_color,
            output_font_shadow_color: record.output_font_shadow_color,
            delay_display_size: record.delay_display_size,
            delay_display_repeat: record.delay_display_repeat,
            delay_display_box_shadow_color: record.delay_display_box_shadow_color,
            delay_display_font_color: record.delay_display_font_color,
            delay_slider_size: record.delay_slider_size,
            delay_slider_repeat: record.delay_slider_repeat,
            delay_slider_box_shadow_color: record.delay_slider_box_shadow_color,
            delay_slider_font_color: record.delay_slider_font_color,
            mod_select_size: record.mod_select_size,
            mod_repeat_value: record.mod_repeat_value,
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
