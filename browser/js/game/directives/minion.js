app.directive('minion', () => {
  return {
    restrict: 'E',
    scope: {
      minion: '='
    },
    templateUrl: '/js/game/directives/minion.html',
    link: (scope, el) => {
      $(el).show('slow');
    }
  };
});
