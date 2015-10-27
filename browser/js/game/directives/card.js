app.directive('card', () => {
  return {
    restrict: 'E',
    scope: {
      card: '='
    },
    templateUrl: '/js/game/directives/card.html',
    link: (scope, el) => {
      $(el).show('slow');
    }
  };
});
