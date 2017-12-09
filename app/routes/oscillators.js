'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('oscillators')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('oscillators')
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
  knex('oscillators')
  .insert({
    user_id: req.body.user_id,
    name: req.body.name,
    waveform: req.body.waveform,
    waveform_modulator: req.body.waveform_modulator,
    hertz: req.body.hertz,
    hertz_modulator: req.body.hertz_modulator,
    detune: req.body.detune,
    detune_modulator: req.body.detune_modulator,
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
  knex('oscillators')
  .where('id', req.params.id)
  .update({
    user_id: req.body.user_id,
    name: req.body.name,
    waveform: req.body.waveform,
    waveform_modulator: req.body.waveform_modulator,
    hertz: req.body.hertz,
    hertz_modulator: req.body.hertz_modulator,
    detune: req.body.detune,
    detune_modulator: req.body.detune_modulator,
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

      knex('oscillators')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('oscillators')
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
            waveform: record.waveform,
            waveform_modulator: record.waveform_modulator,
            hertz: record.hertz,
            hertz_modulator: record.hertz_modulator,
            detune: record.detune,
            detune_modulator: record.detune_modulator,
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
