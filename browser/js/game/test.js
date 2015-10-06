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
  $scope.summonable = (card) => {
    return $scope.turn && card.cost <= $scope.mana;
  };

  $scope.mana = 2;
  $scope.hand = [];
  $scope.decidingCards = [];
  let rejectedCards = [];
  $scope.opponentCards = [];
  $scope.summonedMinions = [];
  $scope.opponentMinions = [];
  let removed = '';

// Testing layout
  // $scope.hand = [
  //   {name: "Hello", description: "happiness is ephermal", cost: 2, ap: 1, hp: 1},
  //   {name: "Goodbye", description: "happiness is eternal", cost: 3, ap: 1, hp: 1},
  //   {name: "Bonjour", description: "was machst du", cost: 1, ap: 4, hp: 1}
  // ];
  // $scope.opponentCards = [{}, {}, {}];
  // $scope.summonedMinions = [$scope.hand[0], $scope.hand[1]];
  // $scope.opponentMinions = [$scope.hand[1]];
  // $scope.player = "sea";
  // $scope.opponent = "sky";
  // $scope.turn = true;

  let deck = user.decks[0].cards.map(card => card._id);
  Socket.emit('playerReady', user.username, deck);

  Socket.on('gameStart', players => {
    $scope.$apply(() => {
      $scope.player = players.player;
      $scope.opponent = players.opponent;
    });
    Socket.emit('initialDraw');
  });
  Socket.on('initialCards', cards => {
    $scope.decidingCards = cards;
    $compile(`<div id="initial"><div class="initial-cards" ng-repeat="card in decidingCards" ng-click="reject(this.$index)"><card card="card" ng-class="{'selected' : card.selected}"></card></div><button ng-click="reject()" id="reject">Reject</button></div>`)($scope).appendTo('#gameboard');
  });
  $scope.reject = idx => {
    if (idx + 1) {
      $scope.decidingCards[idx].selected = !$scope.decidingCards.selected;
      let i = rejectedCards.indexOf(idx);
      if (i > -1) rejectedCards.splice(i, 1);
      else rejectedCards.push(idx);
      return;
    }

    Socket.emit('rejectCards', rejectedCards);
  };

  Socket.on('wait', () => {
    $('#initial').remove();
    $compile(`<div id="initial"><h1>Please wait for your opponent to decide.</h1></div>`)($scope).appendTo('#gameboard');
  });
  Socket.on('startTurn1', (hand, turn) => {
    $scope.$apply(() => {
      $scope.hand = hand;
      $scope.turn = turn;
      $('#initial').remove();
      $scope.opponentCards = [{}, {}, {}];
      if (turn) $scope.opponentCards.push({});
    });
  });

  $scope.summon = (card, e) => {
    Socket.emit('summon', card);
    removed = _.remove($scope.hand, handCard => handCard.name === card.name)[0];
    $scope.mana -= card.cost;
  };

  Socket.on('summoned', card => {
    console.log(`summoned ${card.name}`);
    if (removed.name !== card.name) return console.log('nooo');
    $scope.$apply(() => $scope.summonedMinions.push(card));
  });
  Socket.on('opponentSummoned', card => {
    $scope.$apply(() => $scope.opponentMinions.push(card));
  });

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
