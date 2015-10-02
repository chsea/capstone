app.factory('DeckFactory', function(DS) {
  return DS.defineResource({
    name: 'deck',
  });
}).run(function(DeckFactory) {});
