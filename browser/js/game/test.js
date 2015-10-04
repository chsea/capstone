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
  $scope.hand = [];
  $scope.decidingCards = [];
  let rejectedCards = [];

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
    $compile(`<div ng-repeat="card in decidingCards" ng-click="reject(this.$index)"><card card="card"></card></div><button ng-click="reject()">Reject</button>`)($scope).appendTo('#gameboard');
  });
  $scope.reject = idx => {
    console.log(idx);
    if (idx + 1) {
      rejectedCards.push(idx);
      console.log(rejectedCards);
      return;
    }
    console.log(rejectedCards);

    Socket.emit('rejectCards', rejectedCards);
  }

  Socket.on('startTurn1', hand => {
    $scope.hand = hand;
    $('card').hide('slow').remove();
    $compile(`<card ng-repeat="card in hand" card="card"></card>`)($scope).appendTo('#gameboard');
  })
  $scope.leave = () => {
    Socket.emit('leave');
  }

  Socket.on('win', () => {
    $scope.$apply(() => $scope.message = "You win!");
    setTimeout(() => $state.go('lobby'), 3000);
  })
  Socket.on('lose', () => {
    $scope.$apply(() => $scope.message = "You lose!");
    setTimeout(() => $state.go('lobby'), 3000);
  })
});
