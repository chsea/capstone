app.directive('card', () => {
  return {
    restrict: 'E',
    scope: {
      card: '='
    },
    templateUrl: '/js/game/directives/card.html',
    link: () => {
      $('card').show('slow');
      $('card').draggable();
    }
  }
});
