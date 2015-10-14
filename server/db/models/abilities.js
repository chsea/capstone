var mongoose = require('mongoose')

var schema = new mongoose.Schema({

  taunt: {
    type: String

  },
  charge: {
    type: String

  },
  battlecry: {
    type: String

  },
  windfury: {
    type: String

  },
  deathrattle: {
    type: String

  }


})


mongoose.model('Ability', schema);
