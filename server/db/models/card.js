'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;
var _ = require('lodash')

var cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    default: "none"
  },
  description: {
    type: String,
    // required: true,
  },
  portrait: {
    type: String,
    default: "marketing-intern.jpg"
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
  },
  p1Index: Number,
  p2Index: Number

}, {
  collection: 'cards',
  discriminatorKey: 'type'
});

var minionSchema = cardSchema.extend({
  hp: {
    type: Number,
    required: true,
    min: 0
  },
  logic: {
    battlecry: {},
    deathRattle: {},
    eachTurn: {},
    enrage: {},
    taunt: {
      type: Boolean,
      default: false
    },
    windfury: {
      type: Boolean,
      default: false
    },
    charge: {
      type: Boolean,
      default: false
    },
    divineShield: {
      type: Boolean,
      default: false
    }
  },
  ap: {
    type: Number,
    required: true,
    min: 0
  },
});

var spellSchema = cardSchema.extend({
  logic: {
    target: {

    },
    spells: {

    }
  }


});

cardSchema.statics.packCards = function() {
  var rarityWeighedCards = [];
  return this.find().exec().then(function(cards) {
    cards.forEach(function (card) {
      if (card.rarity === 0 || card.rarity === 1) {
        _.times(4, function() {
          rarityWeighedCards.push(card);
        });
      } else if (card.rarity === 2) {
        _.times(2, function() {
          rarityWeighedCards.push(card);
        });

      } else {
        rarityWeighedCards.push(card);
      }
    });
  }).then(function() {
    var packCards = _.sample(rarityWeighedCards, 5);
    // self.cards += _.sample(rarityWeighedCards, 5);
    return packCards;
  });
};


cardSchema.virtual('rarity.name').get(function() {
  var names = ['common', 'uncommon', 'rare', 'legendary'];
  return names[this.rarity];
});

module.exports = mongoose.model('Card', cardSchema);
mongoose.model('Card', cardSchema);
mongoose.model('minion', minionSchema);
mongoose.model('spell', spellSchema);
