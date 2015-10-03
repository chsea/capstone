app.factory('Game', DS => {
  return DS.defineResource({
    name: 'games',
  });
}).run(Game => {});
