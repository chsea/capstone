app.config($stateProvider => {
  $stateProvider.state('test', {
    url: '/test',
    templateUrl: 'js/game/test.html',
    controller: 'TestController',
    resolve: {
      user: AuthService => AuthService.getLoggedInUser()
    }
  });
}).controller('TestController', ($scope, $state, $compile, Socket, user, Game) => {
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



  let deck = user.decks[0].cards.map(card => card._id);
  Socket.emit('playerReady', user.username, deck);

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
