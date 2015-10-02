app.config($stateProvider => {
  $stateProvider.state('createGame.lobby', {
    url: '/lobby',
    templateUrl: 'js/create-game/lobby.html',
    controller: 'CreateGameLobbyController',
  });
}).controller('CreateGameLobbyController', ($scope, $state, Socket, user) => {
  let refresh = (users, games) => {
    $scope.$apply(() => {
      $scope.users = users;
      $scope.games = games;
    });
  };
  if (!user) $scope.notLoggedIn = true;
  else Socket.emit('enterCreateRoom', user);
  Socket.on('newUser', refresh);

  $scope.joinGame = i => {
    Socket.emit('joinGame', i, user);
    $state.go('createGame.create');
  };
  Socket.on('gameJoined', refresh);
});
