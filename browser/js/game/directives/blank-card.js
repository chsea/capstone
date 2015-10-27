app.directive('blankCard', () => {
  return {
    restrict: 'E',
    scope: {
    },
    link: (scope, el) => {
      $(el).show('slow');
    }
  };
});
