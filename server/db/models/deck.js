var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var deepPopulate = require('mongoose-deep-populate')(mongoose);

var schema = new mongoose.Schema({
  name: {type: String},
  game: {type: ObjectId, ref: 'Game'},
  cards: [{type: ObjectId, ref: "Card"}]
});

schema.plugin(deepPopulate,{});

mongoose.model('Deck', schema);
