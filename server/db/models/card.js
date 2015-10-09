'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;

var cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
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
  cost: {
    type: Number,
    min: 0
  },
  stardustCost: {
    type: Number,
    min: 0
  }

}, {
  collection: 'cards',
  discriminatorKey: 'type'
});

var minionSchema = cardSchema.extend({
  hitPoints: {
    type: Number,
    required: true,
    min: 0
  },
  logic: {
    battlecry: {type:[ObjectId], ref: 'Effect'},
    deathRattle: {type:[ObjectId], ref:'Effect'},
    eachTurn: {type:[ObjectId], ref: 'Effect'},
    enrage: {type:[ObjectId], ref: 'Effect'},
    taunt: {type: Boolean, default:false},
    windfury: {type: Boolean, default:false},
    charge: {type: Boolean, default:false},
    divineshield: {type: Boolean, default:false}
  },
  attackPoints: {
    type: Number,
    required: true,
    min: 0
  },
});

var spellSchema = cardSchema.extend({
  logic:{
    type:[ObjectId],
    ref:'Effect'
  }
});


cardSchema.virtual('rarity.name').get(function() {
  var names = ['common', 'uncommon', 'rare', 'legendary'];
  return names[this.rarity];
});


mongoose.model('Card', cardSchema);
mongoose.model('Minion', minionSchema);
mongoose.model('Spell', spellSchema);
