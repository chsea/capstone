'use strict';
var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;
var schema = new mongoose.Schema({
  name: {type: String, required: true},
  cards: [{type: ObjectId, ref: 'Card'}],
  admins: [{type: ObjectId, ref: 'User'}]
});

mongoose.model('Game', schema);
