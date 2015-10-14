var router = require('express').Router()
var mongoose =require('mongoose')

var Ability = mongoose.model('Ability')



router.get('/', (req,res,next) => {
  // at the moment this on FindOne because we only have one game to make it easier
  Ability.findOne().then(abilities => {
    res.send(abilities)
  }).then(null,next)
})

module.exports = router
