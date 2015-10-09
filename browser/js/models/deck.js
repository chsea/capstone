app.factory('DeckFactory', function(DS) {
  return DS.defineResource({
    name: 'decks',
  });
}).run(function(DeckFactory) {});
