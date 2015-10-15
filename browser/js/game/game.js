app.config($stateProvider => {
  $stateProvider.state('game', {
    url: '/game/:id',
    templateUrl: 'js/game/game.html',
    controller: 'GameController',
  });
}).controller('GameController', ($scope, $state, $compile, Socket, Game) => {
  let players = Game($scope);
  $scope.enlarge = false;
  $scope.enlargedCard = undefined;
  $scope.player = players.player;
  $scope.opponent = players.opponent;
  Socket.emit('playerReady');

  $scope.testcount = 1;

  let rejectedCards = [];
  $scope.reject = idx => {
    $scope.player.decide(idx, rejectedCards);
  };

  $scope.summon = (card, e) => {
    $scope.player.summon(card.id);
  };

  $scope.displayCard = function(card) {
    console.log("display card function successful ", card);
  };


  $scope.select = data => {
    console.log('data', data);
    if (data.selector) $scope.player.attack({attacker: data.selector, attackee: data.selectee});
    else $scope.player.selected(data.selectee);
  };

  $scope.endTurn = () => {
    $scope.player.emitEndTurn();
  };

  $scope.leave = () => {
    console.log("trying to leave");
    Socket.emit('leave');
  };
});
