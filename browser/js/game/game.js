app.config($stateProvider => {
  $stateProvider.state('game', {
    url: '/game/:id',
    templateUrl: 'js/game/game.html',
    controller: 'GameController',
  });
}).controller('GameController', ($scope, $state, Socket) => {
  Socket.emit('startGame');
  Socket.on('gameStarted', players => {
    $scope.$apply(() => {
      $scope.player = players.player;
      $scope.opponent = players.opponent;
    });
    Socket.emit('ready');
  });
  Socket.on('initialCards', cards => {
    console.log(cards);
    $scope.$apply(() => $scope.cards = cards);
  });
});
