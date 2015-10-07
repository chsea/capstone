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
    enum: ['player', 'ownMinion','opponentMinion', 'opponent']

  }

})



var damageSchema = effectsSchema.extend({
  amount: {
    type: Number
  }

})
var healSchema = effectsSchema.extend({
  amount :{
    type:Number
  }
})
var AlterPropertySchema = effectsSchema.extend({
  AP: {
    type: Number
  },
  HP:{
    type: Number
  } ,
  logic: {
    type: enum['s']
  },
  cost: {
    type: Number
  }
})
