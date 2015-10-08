app.config($stateProvider => {
  $stateProvider.state('game', {
    url: '/game/:id',
    templateUrl: 'js/game/game.html',
    controller: 'GameController',
  });
}).controller('GameController', ($scope, $state, $compile, Socket) => {
  $scope.player = Game($scope).player;
  $scope.opponent = Game($scope).opponent;
  $scope.summonable = (card) => {
    return $scope.player.turn && card.cost <= $scope.player.mana;
  };
  $scope.canAttack = (minion) => {
    return $scope.player.turn && minion.canAttack;
  };
  let rejectedCards = [];
  $scope.message = '';

  Socket.emit('playerReady');

  $scope.reject = idx => {
    $scope.player.decide(idx, rejectedCards);
  };

  $scope.summon = (card, e) => {
    $scope.player.summon(card);
  };
  $scope.attack = data => {
    $scope.player.attack(data);
  };

  $scope.endTurn = () => {
    $scope.player.endTurn();
  };

  $scope.leave = () => {
    Socket.emit('leave');
  };

  Socket.on('win', () => {
    Game($scope).setMessage("You win!");
    setTimeout(() => $state.go('lobby'), 3000);
  });
  Socket.on('lose', () => {
    Game($scope).setMessage("You lose!");
    setTimeout(() => $state.go('lobby'), 3000);
  });
});
