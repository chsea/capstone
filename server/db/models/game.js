'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
  name: {type: String, required: true},
  cards: [{type: mongoose.Schema.Types.ObjectId, ref: 'Card'}],
  players: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  admins: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

mongoose.model('Game', schema);
