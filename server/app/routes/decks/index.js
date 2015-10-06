'use strict'
var router = require('express').Router();
var _ = require('lodash');
var mongoose = require('mongoose');
var Deck = mongoose.model('Deck');

router.param('id', (req, res, next, id) => {
  Deck.findById(id)
  .then(function(deck) {
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

router.put('/:id', function(req, res, next) {
  var currentdeck = req.deck.cards;
  console.log("current deck: ", currentdeck);
  // console.log("req.body is the following", req.body);
  var ind = req.deck.cards.indexOf(req.body._id);
  console.log("index: ", ind);
  req.deck.cards.forEach(function(card){
    if (card == req.body._id){
      console.log("removing card");
      var ind = req.deck.cards.indexOf(card);
      req.deck.cards.splice(ind, 1);
    }
  });
  req.deck.save()
    .then(function(updatedDeck) {
      res.json(updatedDeck);
    })
    .then(null, next);
});

router.delete('/:id', (req, res, next) => {
  req.deck.remove().then(deck => {
    res.send(deck);
  }).then(null, next);
});

module.exports = router;
