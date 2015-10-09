var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
  name: {type: String},
  game: {type: ObjectId, ref: 'Game'},
  cards: [{type: ObjectId, ref: "Card"}],
  type: {type:String}
});

schema.plugin(deepPopulate,{});

mongoose.model('Deck', schema);
/*
airbnb: give a minion divineshield
uber: give a minion windfury for a turn
slack: give minions 1/1 if there are three minions
snapchat: heal 2 .
fullstack: summon a 1/1 student
coinbase: give your player two armor (make it just a heal if you want)
pinterest: draw a card




*/