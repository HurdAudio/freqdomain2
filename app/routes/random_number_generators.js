'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('random_number_generators')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('random_number_generators')
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
  knex('random_number_generators')
  .insert({
    user_id: req.body.user_id,
    name: req.body.name,
    positionX: req.body.positionX,
    positionY: req.body.positionY,
    interval: req.body.interval,
    interval_modulator: req.body.interval_modulator,
    maximum: req.body.maximum,
    maximum_modulator: req.body.maximum_modulator,
    minimum: req.body.minimum,
    minimum_modulator: req.body.minimum_modulator,
    continuous: req.body.continuous,
    exponential: req.body.exponential,
    convex: req.body.convex,
    slope: req.body.slope,
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
  knex('random_number_generators')
  .where('id', req.params.id)
  .update({
    user_id: req.body.user_id,
    name: req.body.name,
    positionX: req.body.positionX,
    positionY: req.body.positionY,
    interval: req.body.interval,
    interval_modulator: req.body.interval_modulator,
    maximum: req.body.maximum,
    maximum_modulator: req.body.maximum_modulator,
    minimum: req.body.minimum,
    minimum_modulator: req.body.minimum_modulator,
    continuous: req.body.continuous,
    exponential: req.body.exponential,
    convex: req.body.convex,
    slope: req.body.slope,
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

      knex('random_number_generators')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('random_number_generators')
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
            interval: record.interval,
            interval_modulator: record.interval_modulator,
            maximum: record.maximum,
            maximum_modulator: record.maximum_modulator,
            minimum: record.minimum,
            minimum_modulator: record.minimum_modulator,
            continuous: record.continuous,
            exponential: record.exponential,
            convex: record.convex,
            slope: record.slope,
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
