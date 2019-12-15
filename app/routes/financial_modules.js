'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('financial_modules')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('financial_modules')
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
  knex('financial_modules')
  .insert({
    user_id: req.body.user_id,
    name: req.body.name,
    stock_symbol: req.body.stock_symbol,
    mutual_fund_symbol: req.body.mutual_fund_symbol,
    base_currency: req.body.base_currency,
    exchange_currency: req.body.exchange_currency,
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
  knex('financial_modules')
  .where('id', req.params.id)
  .update({
    user_id: req.body.user_id,
    name: req.body.name,
    stock_symbol: req.body.stock_symbol,
    mutual_fund_symbol: req.body.mutual_fund_symbol,
    base_currency: req.body.base_currency,
    exchange_currency: req.body.exchange_currency,
    output: req.body.output,
    updated_at: req.body.updated_at
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

      knex('financial_modules')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('financial_modules')
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
            stock_symbol: record.stock_symbol,
            mutual_fund_symbol: record.mutual_fund_symbol,
            base_currency: record.base_currency,
            exchange_currency: record.exchange_currency,
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
