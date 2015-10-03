app.factory('Deck', function(DS) {
  return DS.defineResource({
    name: 'decks',
  });
}).run(function(Deck) {});
