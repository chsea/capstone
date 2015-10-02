app.config($stateProvider => {
  $stateProvider.state('createGame', {
    url: '/create-game',
    template: '<ui-view></ui-view>',
    resolve: {
      user: AuthService => AuthService.getLoggedInUser()
    }
  });
});
