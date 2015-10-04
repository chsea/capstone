app.config($stateProvider => {
  $stateProvider.state('game', {
    url: '/game/:id',
    templateUrl: 'js/game/game.html',
    controller: 'GameController',
  });
}).controller('GameController', ($scope, $state, $compile, Socket) => {
  $scope.hand = [];
  $scope.decidingCards = [];
  let rejectedCards = [];
  
  Socket.emit('playerReady');
  Socket.on('gameStart', players => {
    $scope.$apply(() => {
      $scope.player = players.player;
      $scope.opponent = players.opponent;
    });
    Socket.emit('initialDraw');
  });
  Socket.on('initialCards', cards => {
    $scope.decidingCards = cards;
    $compile(`<div id="initial"><div ng-repeat="card in decidingCards" ng-click="reject(this.$index)"><card card="card"></card></div><button ng-click="reject()" id="reject">Reject</button></div>`)($scope).appendTo('#gameboard');
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
    $('#initial').removed();
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
