app.config($stateProvider => {
  $stateProvider.state('joinGame', {
    url: '/join-game',
    template: '<ui-view></ui-view>',
    resolve: {
      user: AuthService => AuthService.getLoggedInUser()
    }
  });
});
