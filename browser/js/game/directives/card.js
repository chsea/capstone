app.directive('card', () => {
  return {
    restrict: 'E',
    scope: {
      card: '='
    },
    templateUrl: '/js/game/directives/card.html',
    link: (scope, el) => {
      $(el).show('slow');
      scope.card.showDescription = Boolean(scope.card.description) || _.some(scope.card.logic, spell => Boolean(spell));
    }
  };
});
