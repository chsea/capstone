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
    mana: 9,
    hand: [],
    summonedMinions: []
  };
  $scope.opponent = {
    hp: 30,
    mana: 9,
    hand: [],
    summonedMinions: []
  };
  $scope.summonable = (card) => {
    return $scope.turn && card.cost <= $scope.player.mana;
  };
  $scope.canAttack = (minion) => {
    return $scope.turn && minion.canAttack;
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
  // $scope.turn = true;

  let deck = user.decks[0].cards.map(card => card._id);
  Socket.emit('playerReady', user.username, deck);

  Socket.on('gameStart', players => {
    $scope.$apply(() => {
      $scope.player.name = players.player;
      $scope.opponent.name = players.opponent;
    });
    Socket.emit('initialDraw');
  });
  Socket.on('initialCards', cards => {
    $scope.player.decidingCards = cards;
    $compile(`<div id="initial"><card card="card" ng-class="{'selected' : card.selected}" ng-repeat="card in player.decidingCards" ng-click="reject(this.$index)"></card><button ng-click="reject()" id="reject">Reject</button></div>`)($scope).appendTo('#gameboard');
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
      } else {
        $scope.opponent.mana++;
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
      $scope.player.summonedMinions.forEach(minion => {
        if (!minion.canAttack) minion.canAttack = true;
      });
      console.log($scope.player.summonedMinions);
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

  let summon = (player, card) => {
    $scope.$apply(() => {
      _.remove($scope[player].hand, handCard => handCard.name === card.name);
      $scope[player].mana -= card.cost;
      $scope[player].summonedMinions.push(card);
    });
  };
  $scope.summon = (card, e) => {
    Socket.emit('summon', card);
  };
  Socket.on('summoned', card => {
    console.log(`summoned ${card.name}`);
    summon('player', card);
  });
  Socket.on('opponentSummoned', card => {
    console.log(`opponent summoned ${card.name}`);
    summon('opponent', card);
  });

  let attack = (player, attackerMinion, attackeeMinion) => {
    let opponent = player === 'player' ? 'opponent' : 'player';
    let attacker = _.find($scope[player].summonedMinions, minion => minion.id === attackerMinion.id);
    console.log(attacker);
    let attackee = _.find($scope[opponent].summonedMinions, minion => minion.id === attackeeMinion.id);

    $scope.$apply(() =>{
      attacker.canAttack = false;
      attacker.hp = attackerMinion.hp;
      attackee.hp = attackeeMinion.hp;

      if (!attacker.hp) _.remove($scope.player.summonedMinions, minion => minion.id === attacker.id);
      if (!attackee.hp) _.remove($scope.opponent.summonedMinions, minion => minion.id === attackee.id);
    });
  };
  $scope.attack = (data, e) => {
    Socket.emit('attack', data.attacker.id, data.attackee.id);
  };
  Socket.on('attacked', (attacker, attackee) => {
    console.log('attacked!');
    attack('player', attacker, attackee);
  });
  Socket.on('wasAttacked', (attacker, attackee) => {
    console.log('was attacked!');
    attack('opponent', attacker, attackee);
  });

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
