app.config($stateProvider => {
  $stateProvider.state('createGame', {
    url: '/create-game',
    templateUrl: 'js/create-game/create-game.html',
    controller: 'CreateGameController',
    resolve: {
      user: AuthService => AuthService.getLoggedInUser()
    }
  });
}).controller('CreateGameController', ($scope, $state, Socket, user) => {
  Socket.emit('createGame', user);
});
