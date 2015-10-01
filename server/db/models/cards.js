'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var extend = require('mongoose-schema-extend')

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
}, { collection : 'cards', discriminatorKey : 'type' });

var minionSchema = schema.extend({
  hitPoints: {
		type: Number,
		required: true,
		min: 0
  },
  attackPoints: {
		type: Number,
		required: true,
		min: 0
  },
});

var spellSchema = schema.extend({});

schema.virtual('rarity.name').get(function () {
  var names = ['common', 'uncommon', 'rare', 'legendary'];
  return names[this.rarity];
});

mongoose.model('Card', schema);
mongoose.model('Minion', minionSchema);
mongoose.model('Spell', spellSchema);
