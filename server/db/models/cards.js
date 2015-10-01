'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var schema = new mongoose.Schema({
  name: {
		type: String,
		required: true
  },
	category: {
		type: String,
		required: true
  },
  type: {
		type: String,
		required: true
  },
  hp: {
		type: Number,
		required: true,
		min: 0
  },
  ap: {
		type: Number,
		required: true,
		min: 0
  },
  description: {
		type: String,
		required: true,
  },
  portrait: {
		type: String,
		default: "http://thecatapi.com/api/images/get?format=src&type=gif"
  },
  rarity: {
		type: Number,
		min: 0
  },
  logic: {
		type: String
  }
});

mongoose.model('Cards', schema);
