var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var extend = require('mongoose-schema-extend');
var Schema = mongoose.Schema;


var effectsSchema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  target: {
    type: [String],
    enum: ['player', 'playerCard','opponentCard', 'opponent','anyCard'],
  },
  quantity: {
    type: Number
  }

}, {
  collection: 'effects',
  discriminatorKey: 'type'
});



var damageSchema = effectsSchema.extend({
  amount: {
    type: Number
  }

});
var healSchema = effectsSchema.extend({
  amount :{
    type:Number
  }
});

var AlterPropertySchema = effectsSchema.extend({
  attackPoints: {
    type: Number
  },
  hitPoints:{
    type: Number
  } ,
  cost: {
    type: Number
  },
  logic:{
    windfury: Boolean,
    battlecry: Boolean,
    divineShield: Boolean,
    charge: Boolean
  }
});



mongoose.model('Effect', effectsSchema);

mongoose.model('Damage', damageSchema);
mongoose.model('Heal', effectsSchema);
mongoose.model('Alter', AlterPropertySchema);
