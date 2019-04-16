'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('delays')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('delays')
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
  knex('delays')
  .insert({
    user_id: req.body.user_id,
    name: req.body.name,
    delay: req.body.delay,
    delay_modulator: req.body.delay_modulator,
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
  knex('delays')
  .where('id', req.params.id)
  .update({
    user_id: req.body.user_id,
    name: req.body.name,
    delay: req.body.delay,
    delay_modulator: req.body.delay_modulator,
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

      knex('delays')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('delays')
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
            delay: record.delay,
            delay_modulator: record.delay_modulator,
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
