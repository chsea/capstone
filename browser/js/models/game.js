app.factory('Game', function(DS) {
  return DS.defineResource({
    name: 'games',
  });
}).run(function(Game) {});
