'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('master_volumes')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('master_volumes')
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
  knex('master_volumes')
  .insert({
    user_id: req.body.user_id,
    signal_path_id: req.body.signal_path_id,
    master_volume_gain_value: req.body.master_volume_gain_value,
    input: req.body.input,
    mute: req.body.mute
  }, '*')
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
});


router.patch('/:id', (req, res, next) => {
  knex('master_volumes')
  .where('id', req.params.id)
  .update({
    user_id: req.body.user_id,
    signal_path_id: req.body.signal_path_id,
    master_volume_gain_value: req.body.master_volume_gain_value,
    input: req.body.input,
    mute: req.body.mute
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

      knex('master_volumes')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('master_volumes')
            .del()
            .where('id', req.params.id);
        })
        .then(() => {
          var holder = record.id;
          delete record.id;

          var obj = {
            id: holder,
            user_id: record.user_id,
            signal_path_id: record.signal_path_id,
            master_volume_gain_value: record.master_volume_gain_value,
            input: record.input,
            mute: record.mute,
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
