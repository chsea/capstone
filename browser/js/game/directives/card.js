app.directive('card', () => {
  return {
    restrict: 'E',
    scope: {
      cost: '@',
      name: '@',
      description: '@',
      ap: '@',
      hp: '@'
    },
    templateUrl: '/js/game/directives/card.html'
  }
});
