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
  $scope.decks = user.decks;

  $scope.start = () => {
    Socket.emit('join', user.username, $scope.selectedDeck.cards);
  };

  Socket.on('waitForPlayer', () => {
    $scope.$apply(() => $scope.waiting = true);
  });

  Socket.on('gameReady', i => {
    $state.go('game', {id: i});
  });
  
});
