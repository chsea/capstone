app.directive('player', () => {
  return {
    restrict: 'E',
    scope: {
      player: '='
    },
    templateUrl: '/js/game/directives/player.html',
    link: (scope, el) => {
    }
  };
});
