app.factory('AbilityFactory', function(DS) {
  return DS.defineResource({
    name:'abilities'
  });

}).run(function(AbilityFactory){
  AbilityFactory.findAll();
});
