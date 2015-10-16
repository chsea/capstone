app.config($stateProvider => {
  $stateProvider.state('test', {
    url: '/test',
    templateUrl: 'js/game/test.html',
    controller: 'TestController',
    resolve: {
      player: AuthService => AuthService.getLoggedInUser()
    }
  });
}).controller('TestController', ($scope, $state, $compile, Socket, player, Game) => {
  $scope.displayCard = function(card) {
    console.log("display card function successful ", card);
  };

  $scope.enlargeCard = function(card) {
    console.log(card);
    $scope.enlarge = card;
  };
  
  let players = Game($scope);
  $scope.player = players.player;
  // $scope.player.portrait = player.portrait;
  $scope.opponent = players.opponent;
  let rejectedCards = [];

  let deck = player.decks[0].cards.map(card => card._id);
  Socket.emit('playerReady', player.username, deck);

  $scope.reject = idx => {
    $scope.player.decide(idx, rejectedCards);
  };

  $scope.summon = (card, e) => {
    $scope.player.summon(card.id);
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
