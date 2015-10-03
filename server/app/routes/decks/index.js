'use strict'
var router = require('express').Router();
var _ = require('lodash');
var mongoose = require('mongoose');
var Deck = mongoose.model('Deck');

router.param('id', (req, res, next, id) => {
  Deck.findById(id).then(deck => {
      req.deck = deck;
      next();
    })
    .then(null, next);
});

router.get('/', (req, res, next) => {
  Deck.find(req.query).populate('cards').exec()
  .then(decks => res.send(decks))
  .then(null, next);
});

router.post('/', (req, res, next) => {
  Deck.create(req.body).then(deck => {
    res.send(deck);
  });
});

router.get('/:id', (req, res, next) => res.send(req.deck));

router.put('/:id', (req, res, next) => {
  _.merge(req.deck, req.body);
  req.deck.save().then(deck => {
    res.send(deck);
  }).then(null, next);
});

router.delete('/:id', (req, res, next) => {
  req.deck.remove().then(deck => {
    res.send(deck);
  }).then(null, next);
});

module.exports = router;
