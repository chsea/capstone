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
  // let attack = (player, attackerMinion, attackeeMinion) => {
  //   let opponent = player === 'player' ? 'opponent' : 'player';
  //   let attacker = _.find($scope[player].summonedMinions, minion => minion.id === attackerMinion.id);
  //
  //   let attackee = attackeeMinion.id ?  _.find($scope[opponent].summonedMinions, minion => minion.id === attackeeMinion.id) : $scope[opponent];
  //
  //
  //   $scope.$apply(() =>{
  //     attacker.canAttack = false;
  //     attacker.hp = attackerMinion.hp;
  //     attackee.hp = attackeeMinion.hp;
  //
  //     if (!attacker.hp) _.remove($scope[player].summonedMinions, minion => minion.id === attacker.id);
  //     if (!attackee.hp) _.remove($scope[opponent].summonedMinions, minion => minion.id === attackee.id);
  //   });
  // };
  $scope.attack = data => {
    $scope.player.attack(data);
  };
  // Socket.on('attacked', (attacker, attackee) => {
  //   console.log('attacked!');
  //   attack('player', attacker, attackee);
  // });
  // Socket.on('wasAttacked', (attacker, attackee) => {
  //   console.log('was attacked!');
  //   attack('opponent', attacker, attackee);
  // });
  //
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
