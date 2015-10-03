'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
  name: {
		type: String,
		required: true
  },
	category: {
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
  },
	cost: {
		type: Number,
		min: 0
  }
}, { collection : 'cards', discriminatorKey : 'type' });

var minionSchema = cardSchema.extend({
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




var spellSchema = cardSchema.extend({});

cardSchema.virtual('rarity.name').get(function () {
  var names = ['common', 'uncommon', 'rare', 'legendary'];
  return names[this.rarity];
});

mongoose.model('Card', cardSchema);
mongoose.model('Minion', minionSchema);
mongoose.model('Spell', spellSchema);
