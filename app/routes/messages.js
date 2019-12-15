'use strict';

const express = require('express');
const knex = require('../../knex');

const router = express.Router();


router.get('/', (req, res, next) => {
  knex('messages')
  .select('*')
  .then((results) => {
    res.send(results);
  })
  .catch((err) => {
    next (err);
  });
});

router.get('/:id', (req, res, next) => {

  knex('messages')
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
  knex('messages')
  .insert({
    user_author_id: req.body.user_author_id,
    recipients_id: req.body.recipients_id,
    subject: req.body.subject,
    message: req.body.message,
    links: req.body.links,
    thread_parent: req.body.thread_parent,
    thread_child: req.body.thread_child,
    read: req.body.read,
    admin_message: req.body.admin_message
  }, '*')
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
});


router.patch('/:id', (req, res, next) => {
  knex('messages')
  .where('id', req.params.id)
  .update({
    user_author_id: req.body.user_author_id,
    recipients_id: req.body.recipients_id,
    subject: req.body.subject,
    message: req.body.message,
    links: req.body.links,
    thread_parent: req.body.thread_parent,
    thread_child: req.body.thread_child,
    read: req.body.read,
    admin_message: req.body.admin_message,
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

      knex('messages')
        .where('id', req.params.id)
        .first()
        .then((row) => {
          if (!row) {
            return next();
          }

          record = row;


          return knex('messages')
            .del()
            .where('id', req.params.id);
        })
        .then(() => {
          var holder = record.id;
          delete record.id;

          var obj = {
            id: holder,
            user_author_id: record.user_author_id,
            recipients_id: record.recipients_id,
            subject: record.subject,
            message: record.message,
            links: record.links,
            thread_parent: record.thread_parent,
            thread_child: record.thread_child,
            read: record.read,
            admin_message: record.admin_message,
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
