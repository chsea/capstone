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
    cards.forEach(card => {
      $compile(`<card name='${card.name}' ap='${card.ap}' hp='${card.hp}'></card>`)($scope).appendTo('#gameboard');
    })
    $('card').show('slow');
    // $scope.$apply(() => $scope.cards = cards);
  });

  $scope.leave = () => {
    console.log(user);
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
