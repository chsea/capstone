var mongoose = require('mongoose')

var schema = new Mongoose.schema( {
    names: {
      'Taunt': 'Loyal',
      'Windfury':'Agile',
      'Deathrattle': 'Sevearence',
      'Charge': 'Initiative',
      'Battlecry': 'Inspiration'
    }

})


mongoose.model('Abilities', schema);
