'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
module.exports = router;
var User = mongoose.model('User');
var deepPopulate = require('mongoose-deep-populate')(mongoose)


var missingItemHandler = function(error, cb) {
  //custom error handler for missing users and products
  error.status(404);
  cb(error);
};

router.param('userId', function(req, res, next, id) {
  User.findById(id).deepPopulate('decks.cards').exec()
    .then(function(element) {
      req.foundUser = element;
      next();
    })
    .then(null, function(error) {
      missingItemHandler(error, next);
    });
});

router.get('/', function(req, res, next) {
  User.find(req.query).populate('decks').exec()
    //included req.query in the case of possibly filtering users - possibly not needed.
    .then(function(results) {
      res.json(results);
    })
    .then(null, next);
});

router.get('/:userId', function(req, res) {
  res.json(req.foundUser);
});

router.post('/', function(req, res, next) {
  if (req.user && !req.user.isAdmin) delete req.body.isAdmin;
  User.create(req.body)
    .then(function(user) {
      req.login(user, function(error) {
        if (error) throw new Error();
        res.status(200).json(user);
      });
    })
    .then(null, next);
});

router.put('/:userId', function(req, res, next) {
  if (req.user.name !== req.foundUser.name) return res.sendStatus(404);
  Object.keys(req.body).forEach(function(key) {
    if (req.foundUser[key] === false || key === 'isAdmin') req.foundUser[key] = req.body[key];
  });
  return req.foundUser.save()
    .then(function(element) {
      console.log("updated user");
      return res.json(element);
    })
    .then(null, next);
});

router.delete('/:userId', function(req, res, next) {
  req.foundUser.remove()
    .then(function() {
      res.sendStatus(204);
      //could be 410 - gone.
    })
    .then(null, next);
});
