app.config($stateProvider => {
  $stateProvider.state('game', {
    url: '/game/:id',
    templateUrl: 'js/game/game.html',
    controller: 'GameController',
  });
}).controller('GameController', ($scope, $state, Socket) => {
  Socket.emit('startedGame');
  Socket.on('players', (players, cards) => {
    console.log(cards);
    $scope.$apply(() => {
      $scope.p1 = players.player;
      $scope.p2 = players.opponent;
      $scope.c1 = cards.card1;
      $scope.c2 = cards.card2;
    });
  });
});
