app.directive('blankCard', () => {
  return {
    restrict: 'E',
    scope: {
    },
    templateUrl: '/js/game/directives/blank-card.html',
    link: () => {
      $('blank-card').show('slow');
      // $('card').draggable();
    }
  };
});
