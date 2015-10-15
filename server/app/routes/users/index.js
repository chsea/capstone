'use strict';
var mongoose = require('mongoose');
var router = require('express').Router();
var User = mongoose.model('User');
var deepPopulate = require('mongoose-deep-populate')(mongoose);
module.exports = router;
var Card = mongoose.model('Card');
var _ = require('lodash')


var missingItemHandler = function(error, cb) {
  //custom error handler for missing users and products
  error.status(404);
  cb(error);
};

router.param('userId', function(req, res, next, userId) {
  User.findById(userId).deepPopulate('decks cards username').exec()
    .then(function(user) {
      // console.log(user);
      req.foundUser = user;
      next();
    })
    .then(null, function(error) {
      missingItemHandler(error, next);
    });
});

router.get('/', function(req, res, next) {
  //included req.query in the case of possibly filtering users - possibly not needed.
  User.find(req.query).populate('decks').exec()
    .then(function(results) {
      res.json(results);
    })
    .then(null, next);
});

router.get('/:userId', function(req, res) {
  res.json(req.foundUser);
});

router.put('/:userId', function(req, res, next) {
  Object.keys(req.body).forEach(function(key) {
    req.foundUser[key] = req.body[key];
  });
  return req.foundUser.save()
    .then(function(element) {
      res.json(element);
    })
    .then(null, next);
});
router.put('/:userId/packs', function(req, res, next) {
  if(req.user.packs < 1) return;
  console.log(req.foundUser)
  return req.foundUser.openPack().then(user => {
    res.json(user)
  }).then(null, next);

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


router.delete('/:userId', function(req, res, next) {
  req.foundUser.remove()
    .then(function() {
      res.sendStatus(204);
      //could be 410 - gone.
    })
    .then(null, next);
});
