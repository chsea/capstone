app.config($stateProvider => {
  $stateProvider.state('play.selectDeck', {
    url: '/:name/select-deck',
    templateUrl: 'js/play/select-deck.html',
    controller: 'PlaySelectDeckController',
    resolve: {
      user: AuthService => AuthService.getLoggedInUser()
    }
  });
}).controller('PlaySelectDeckController', ($scope, $state, $stateParams, $http, Socket, user) => {
  $scope.isLoggedIn = true;
  if (!user) {
    $scope.isLoggedIn = false;
  }
  $scope.decks = user.decks.filter(deck => deck.game.name == $stateParams.name);
  $scope.start = () => {
    let deck = _.find($scope.decks, {_id: $scope.selectedDeck});
    Socket.emit('join', user.username, deck.cards);
  };
  Socket.on('waitForPlayer', () => {
    $scope.$apply(() => $scope.waiting = true);
  });
  Socket.on('gameReady', i => {
    $state.go('game', {id: i})
  });
});
