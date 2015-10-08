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

  // Testing layout
  // $scope.player.hand = [
  //   {name: "Hello", description: "happiness is ephermal", cost: 2, ap: 1, hp: 6, id: 0},
  //   {name: "Goodbye", description: "happiness is eternal", cost: 3, ap: 1, hp: 1, id: 1},
  //   {name: "Bonjour", description: "was machst du", cost: 1, ap: 3, hp: 4, id: 2}
  // ];
  // $scope.opponent.hand = [{}, {}, {}];
  // $scope.player.summonedMinions = [$scope.player.hand[0], $scope.player.hand[1]];
  // $scope.opponent.summonedMinions = [$scope.player.hand[2]];
  // $scope.player.name = "sea";
  // $scope.opponent.name = "sky";
  // $scope.player.turn = true;

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
    $scope.player.emitEndTurn();
  };

  $scope.leave = () => {
    Socket.emit('leave');
  };
});
