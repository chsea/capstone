app.factory('Card', function(DS) {
  return DS.defineResource({
    name: 'cards',
  });
}).run(function(Card) {});
