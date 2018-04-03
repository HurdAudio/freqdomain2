'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('envelope_generators')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('envelope_generators')
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
  knex('envelope_generators')
  .insert({
    user_id: req.body.user_id,
    name: req.body.name,
    attack_start: req.body.attack_start,
    attack_start_modulator: req.body.attack_start_modulator,
    attack_time_interval: req.body.attack_time_interval,
    attack_time_interval_modulator: req.body.attack_time_interval_modulator,
    attack_end: req.body.attack_end,
    attack_end_modulator: req.body.attack_end_modulator,
    attack_exponential: req.body.attack_exponential,
    attack_convex: req.body.attack_convex,
    attack_slope: req.body.attack_slope,
    decay_on: req.body.decay_on,
    decays: req.body.decays,
    sustain_on: req.body.sustain_on,
    sustain_modulator: req.body.sustain_modulator,
    post_sustain_on: req.body.post_sustain_on,
    post_sustains: req.body.post_sustains,
    release_time_interval: req.body.release_time_interval,
    release_time_interval_modulator: req.body.release_time_interval_modulator,
    release_end_value: req.body.release_end_value,
    release_end_value_modulator: req.body.release_end_value_modulator,
    release_exponential: req.body.release_exponential,
    release_convex: req.body.release_convex,
    release_slope: req.body.release_slope,
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
  knex('envelope_generators')
  .where('id', req.params.id)
  .update({
    user_id: req.body.user_id,
    name: req.body.name,
    attack_start: req.body.attack_start,
    attack_start_modulator: req.body.attack_start_modulator,
    attack_time_interval: req.body.attack_time_interval,
    attack_time_interval_modulator: req.body.attack_time_interval_modulator,
    attack_end: req.body.attack_end,
    attack_end_modulator: req.body.attack_end_modulator,
    attack_exponential: req.body.attack_exponential,
    attack_convex: req.body.attack_convex,
    attack_slope: req.body.attack_slope,
    decay_on: req.body.decay_on,
    decays: req.body.decays,
    sustain_on: req.body.sustain_on,
    sustain_modulator: req.body.sustain_modulator,
    post_sustain_on: req.body.post_sustain_on,
    post_sustains: req.body.post_sustains,
    release_time_interval: req.body.release_time_interval,
    release_time_interval_modulator: req.body.release_time_interval_modulator,
    release_end_value: req.body.release_end_value,
    release_end_value_modulator: req.body.release_end_value_modulator,
    release_exponential: req.body.release_exponential,
    release_convex: req.body.release_convex,
    release_slope: req.body.release_slope,
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

      knex('envelope_generators')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('envelope_generators')
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
            attack_start: record.attack_start,
            attack_start_modulator: record.attack_start_modulator,
            attack_time_interval: record.attack_time_interval,
            attack_time_interval_modulator: record.attack_time_interval_modulator,
            attack_end: record.attack_end,
            attack_end_modulator: record.attack_end_modulator,
            attack_exponential: record.attack_exponential,
            attack_convex: record.attack_convex,
            attack_slope: record.attack_slope,
            decay_on: record.decay_on,
            decays: record.decays,
            sustain_on: record.sustain_on,
            sustain_modulator: record.sustain_modulator,
            post_sustain_on: record.post_sustain_on,
            post_sustains: record.post_sustains,
            release_time_interval: record.release_time_interval,
            release_time_interval_modulator: record.release_time_interval_modulator,
            release_end_value: record.release_end_value,
            release_end_value_modulator: record.release_end_value_modulator,
            release_exponential: record.release_exponential,
            release_convex: record.release_convex,
            release_slope: record.release_slope,
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
