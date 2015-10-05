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
  $scope.mana = 5;
  $scope.hand = [];
  $scope.decidingCards = [];
  let rejectedCards = [];
  $scope.opponentCards = [{},{},{}];
  $scope.summonedMinions = [];

  $scope.testCards = [
    {name: "Hello", description: "happiness is ephermal", cost: 2, ap: 1, hp: 1},
    {name: "Goodbye", description: "happiness is eternal", cost: 1, ap: 1, hp: 1},
    {name: "Bonjour", description: "was machst du", cost: 1, ap: 4, hp: 1}
  ];
  $scope.player = "sea";
  $scope.opponent = "sky";

  let deck = user.decks[0].cards.map(card => card._id);
  // Socket.emit('playerReady', user.username, deck);

  Socket.on('gameStart', players => {
    $scope.$apply(() => {
      $scope.player = players.player;
      $scope.opponent = players.opponent;
    });
    Socket.emit('initialDraw');
  });
  Socket.on('initialCards', cards => {
    $scope.decidingCards = cards;
    $compile(`<div id="initial"><div ng-repeat="card in decidingCards" ng-click="reject(this.$index)"><card card="card" ng-class="{'selected' : card.selected}"></card></div><button ng-click="reject()" id="reject">Reject</button></div>`)($scope).appendTo('#gameboard');
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
  Socket.on('startTurn1', hand => {
    $scope.hand = hand;
    $('#initial').remove();
    $compile(`<card ng-repeat="card in hand" card="card"></card>`)($scope).appendTo('#gameboard');
  });

  $scope.summon = (data, event) => {
    $scope.summonedMinions.push(data);
      _.remove($scope.testCards, card => card.name === data.name);
    console.log($scope.testCards);
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
