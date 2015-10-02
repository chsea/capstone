app.factory('GameFactory', function(DS) {
  return DS.defineResource({
    name: 'games',
  });
}).run(function(GameFactory) {});
