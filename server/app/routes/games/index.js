'use strict';
var router = require('express').Router();
var _ = require('lodash');
var Game = mongoose.model('Game');

router.param('id', (req, res, next, id) => {
  Game.findById(id).then(game => {
      req.game = game;
      next();
    })
    .then(null, next);
});

router.get('/', (req, res) => {
  Game.find().then(games => res.send(games));
});

router.post('/', (req, res) => {
  Game.create(req.body).then(game => {
    res.send(game);
  });
});

router.get('/:id', (req, res) => res.send(req.game));

router.put('/:id', (req, res, next) => {
  _.merge(req.game, req.body);
  req.game.save().then(game => {
    res.send(game);
  }).then(null, next);
});

router.delete('/:id', (req, res, next) => {
  req.game.remove().then(game => {
    res.send(game);
  }).then(null, next);
});

module.exports = router;
