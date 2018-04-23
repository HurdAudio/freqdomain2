'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('weather_modules')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('weather_modules')
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
  knex('weather_modules')
  .insert({
    user_id: req.body.user_id,
    name: req.body.name,
    zip_code_toggle: req.body.zip_code_toggle,
    zip_digit_1: req.body.zip_digit_1,
    zip_digit_1_modulator: req.body.zip_digit_1_modulator,
    zip_digit_2: req.body.zip_digit_2,
    zip_digit_2_modulator: req.body.zip_digit_2_modulator,
    zip_digit_3: req.body.zip_digit_3,
    zip_digit_3_modulator: req.body.zip_digit_3_modulator,
    zip_digit_4: req.body.zip_digit_4,
    zip_digit_4_modulator: req.body.zip_digit_4_modulator,
    zip_digit_5: req.body.zip_digit_5,
    zip_digit_5_modulator: req.body.zip_digit_5_modulator,
    country: req.body.country,
    city: req.body.city,
    output: req.body.output
  }, '*')
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
});


router.patch('/:id', (req, res, next) => {
  knex('weather_modules')
  .where('id', req.params.id)
  .update({
    user_id: req.body.user_id,
    name: req.body.name,
    zip_code_toggle: req.body.zip_code_toggle,
    zip_digit_1: req.body.zip_digit_1,
    zip_digit_1_modulator: req.body.zip_digit_1_modulator,
    zip_digit_2: req.body.zip_digit_2,
    zip_digit_2_modulator: req.body.zip_digit_2_modulator,
    zip_digit_3: req.body.zip_digit_3,
    zip_digit_3_modulator: req.body.zip_digit_3_modulator,
    zip_digit_4: req.body.zip_digit_4,
    zip_digit_4_modulator: req.body.zip_digit_4_modulator,
    zip_digit_5: req.body.zip_digit_5,
    zip_digit_5_modulator: req.body.zip_digit_5_modulator,
    country: req.body.country,
    city: req.body.city,
    output: req.body.output
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

      knex('weather_modules')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('gains')
            .del()
            .where('id', req.params.id);
        })
        .then(() => {
          var holder = record.id;
          delete record.id;

          var obj = {
            id: holder,
            user_id: record.user_id,
            name: record.name,
            zip_code_toggle: record.zip_code_toggle,
            zip_digit_1: record.zip_digit_1,
            zip_digit_1_modulator: record.zip_digit_1_modulator,
            zip_digit_2: record.zip_digit_2,
            zip_digit_2_modulator: record.zip_digit_2_modulator,
            zip_digit_3: record.zip_digit_3,
            zip_digit_3_modulator: record.zip_digit_3_modulator,
            zip_digit_4: record.zip_digit_4,
            zip_digit_4_modulator: record.zip_digit_4_modulator,
            zip_digit_5: record.zip_digit_5,
            zip_digit_5_modulator: record.zip_digit_5_modulator,
            country: record.country,
            city: record.city,
            output: record.output,
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
