app.config($stateProvider => {
  $stateProvider.state('game', {
    url: '/game/:id',
    templateUrl: 'js/game/game.html',
    controller: 'GameController',
  });
}).controller('GameController', ($scope, $state, Socket) => {
  Socket.emit('playerReady');
  Socket.on('gameReady', players => {
    $scope.$apply(() => {
      $scope.player = players.player;
      $scope.opponent = players.opponent;
    });
    Socket.emit('start');
  });
  Socket.on('initialCards', cards => {
    $scope.$apply(() => $scope.cards = cards);
  });
});
