app.config($stateProvider => {
  $stateProvider.state('game', {
    url: '/game',
    template: '<ui-view></ui-view>'
  });
});
