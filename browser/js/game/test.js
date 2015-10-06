app.config($stateProvider => {
  $stateProvider.state('test', {
    url: '/test',
    templateUrl: 'js/game/test.html',
    controller: 'TestController',
    resolve: {
      user: AuthService => AuthService.getLoggedInUser()
    }
  });
}).controller('TestController', ($scope, $state, $compile, Socket, user) => {
  $scope.player = {
    hp: 30,
    mana: 10,
    hand: [],
    summonedMinions: []
  };
  $scope.opponent = {
    hp: 30,
    mana: 0,
    hand: [],
    summonedMinions: []
  };
  $scope.summonable = (card) => {
    return $scope.turn && card.cost <= $scope.player.mana;
  };
  let rejectedCards = [];
  let removed = '';

// Testing layout
  $scope.player.hand = [
    {name: "Hello", description: "happiness is ephermal", cost: 2, ap: 1, hp: 6, id: 0},
    {name: "Goodbye", description: "happiness is eternal", cost: 3, ap: 1, hp: 1, id: 1},
    {name: "Bonjour", description: "was machst du", cost: 1, ap: 3, hp: 4, id: 2}
  ];
  $scope.opponent.hand = [{}, {}, {}];
  $scope.player.summonedMinions = [$scope.player.hand[0], $scope.player.hand[1]];
  $scope.opponent.summonedMinions = [$scope.player.hand[2]];
  $scope.player.name = "sea";
  $scope.opponent.name = "sky";
  $scope.turn = true;

  let deck = user.decks[0].cards.map(card => card._id);
  // Socket.emit('playerReady', user.username, deck);

  Socket.on('gameStart', players => {
    $scope.$apply(() => {
      $scope.player.name = players.player;
      $scope.opponent.name = players.opponent;
    });
    Socket.emit('initialDraw');
  });
  Socket.on('initialCards', cards => {
    $scope.player.decidingCards = cards;
    $compile(`<div id="initial"><div class="initial-cards" ng-repeat="card in player.decidingCards" ng-click="reject(this.$index)"><card card="card" ng-class="{'selected' : card.selected}"></card></div><button ng-click="reject()" id="reject">Reject</button></div>`)($scope).appendTo('#gameboard');
  });
  $scope.reject = idx => {
    if (idx + 1) {
      $scope.player.decidingCards[idx].selected = !$scope.player.decidingCards[idx].selected;
      let i = rejectedCards.indexOf(idx);
      if (i > -1) rejectedCards.splice(i, 1);
      else rejectedCards.push(idx);
      return;
    }

    Socket.emit('rejectCards', rejectedCards);
  };

  Socket.on('waitInitial', () => {
    $scope.$apply(() => $scope.opponent.hand.push({}));
    $('#initial').remove();
    $compile(`<div id="initial"><h1>Please wait for your opponent to decide.</h1></div>`)($scope).appendTo('#gameboard');
  });
  Socket.on('startTurn1', (hand, turn) => {
    $scope.$apply(() => {
      $scope.player.hand = hand;
      $scope.turn = turn;
      $('#initial').remove();
      $scope.opponent.hand = [{}, {}, {}];
      if (turn) {
        $scope.player.mana++;
        $scope.opponent.hand.push({});
      }
      $scope.message = turn ? "Your turn!" : "Opponent's turn!";
    });
  });
  Socket.on('startTurn', card => {
    console.log(card);
    $scope.$apply(() => {
      $scope.player.hand.push(card);
      $scope.player.mana++;
      $scope.turn = true;
      $scope.message = 'Your turn!';
    });
  });
  Socket.on('wait', () => {
    $scope.$apply(() => {
      $scope.opponent.hand.push({});
      $scope.opponent.mana++;
      $scope.turn = false;
      $scope.message = "Opponent's turn!";
    });
  });

  $scope.summon = (card, e) => {
    Socket.emit('summon', card);
    console.dir(e);
    removed = _.remove($scope.player.hand, handCard => handCard.name === card.name)[0];
    $scope.player.mana -= card.cost;
  };

  Socket.on('summoned', card => {
    console.log(`summoned ${card.name}`);
    if (removed.name !== card.name) return console.log('nooo');
    $scope.$apply(() => $scope.player.summonedMinions.push(card));
  });
  Socket.on('opponentSummoned', () => {
    $scope.$apply(() => {
      $scope.opponent.summonedMinions.push({});
      $scope.opponent.hand.pop();
    });
  });

  $scope.attack = (data, e) => {
    let attacker = _.find($scope.player.summonedMinions, minion => minion.id === data.attacker.id);
    let attackee = _.find($scope.opponent.summonedMinions, minion => minion.id === data.attackee.id);
    let attackerHp = attacker.hp - attackee.ap;
    let attackeeHp = attackee.hp - attacker.ap;

    if (attackerHp <= 0) _.remove($scope.player.summonedMinions, minion => minion.id === attacker.id);
    else attacker.hp = attackerHp;
    if (attackeeHp <= 0) _.remove($scope.opponent.summonedMinions, minion => minion.id === attackee.id);
    else attackee.hp = attackeeHp;
    // Socket.emit('attack', attacker.id, attackee.id);
  };

  $scope.endTurn = () => {
    console.log('end turn');
    $scope.turn = false;
    Socket.emit('endTurn');
  };

  $scope.leave = () => {
    Socket.emit('leave');
  };

  Socket.on('win', () => {
    $scope.$apply(() => $scope.message = "You win!");
    setTimeout(() => $state.go('lobby'), 3000);
  });
  Socket.on('lose', () => {
    $scope.$apply(() => $scope.message = "You lose!");
    setTimeout(() => $state.go('lobby'), 3000);
  });
});
