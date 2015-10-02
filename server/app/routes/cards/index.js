'use strict';
var router = require('express').Router();
var _ = require('lodash');
var mongoose = require('mongoose');
var Card = mongoose.model('Card');



router.param('id', (req, res, next, id) => {
  Card.findById(id).then(card => {
      req.card = card;
      next();
    })
    .then(null, next);
});

router.get('/', (req, res) => {
  Card.find(req.query)
  .then(cards => res.send(cards))
  .then(null,next);
});

router.post('/', (req, res) => {
  Card.create(req.body).then(card => {
    res.send(card);
  });
});

router.get('/:id', (req, res) => res.send(req.card));

router.put('/:id', (req, res, next) => {
  _.merge(req.card, req.body);
  req.card.save().then(card => {
    res.send(card);
  }).then(null, next);
});

router.delete('/:id', (req, res, next) => {
  req.card.remove().then(card => {
    res.send(card);
  }).then(null, next);
});

module.exports = router;
