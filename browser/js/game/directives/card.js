app.directive('card', () => {
  return {
    restrict: 'E',
    scope: {
      card: '='
    },
    templateUrl: '/js/game/directives/card.html',
    link: (scope, el) => {
      console.log(scope.card);
      angular.element(document).ready(function() {
        $(el).show('slow');
      });
    }
  };
});
