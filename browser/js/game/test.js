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
  let players = Game($scope);
  $scope.player = players.player;
  $scope.opponent = players.opponent;
  let rejectedCards = [];

  let deck = user.decks[0].cards.map(card => card._id);
  Socket.emit('playerReady', user.username, deck);

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
