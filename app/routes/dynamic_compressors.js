'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('dynamic_compressors')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('dynamic_compressors')
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
  knex('dynamic_compressors')
  .insert({
    user_id: req.body.user_id,
    name: req.body.name,
    positionX: req.body.positionX,
    positionY: req.body.positionY,
    threshold: req.body.threshold,
    threshold_modulator: req.body.threshold_modulator,
    knee: req.body.knee,
    knee_modulator: req.body.knee_modulator,
    ratio: req.body.ratio,
    ratio_modulator: req.body.ratio_modulator,
    attack: req.body.attack,
    attack_modulator: req.body.attack_modulator,
    release: req.body.release,
    release_modulator: req.body.release_modulator,
    input: req.body.input,
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
  knex('dynamic_compressors')
  .where('id', req.params.id)
  .update({
    user_id: req.body.user_id,
    name: req.body.name,
    positionX: req.body.positionX,
    positionY: req.body.positionY,
    threshold: req.body.threshold,
    threshold_modulator: req.body.threshold_modulator,
    knee: req.body.knee,
    knee_modulator: req.body.knee_modulator,
    ratio: req.body.ratio,
    ratio_modulator: req.body.ratio_modulator,
    attack: req.body.attack,
    attack_modulator: req.body.attack_modulator,
    release: req.body.release,
    release_modulator: req.body.release_modulator,
    input: req.body.input,
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

      knex('dynamic_compressors')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('dynamic_compressors')
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
            positionX: record.positionX,
            positionY: record.positionY,
            threshold: record.threshold,
            threshold_modulator: record.threshold_modulator,
            knee: record.knee,
            knee_modulator: record.knee_modulator,
            ratio: record.ratio,
            ratio_modulator: record.ratio_modulator,
            attack: record.attack,
            attack_modulator: record.attack_modulator,
            release: record.release,
            release_modulator: record.release_modulator,
            input: record.input,
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
