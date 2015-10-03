app.config($stateProvider => {
  $stateProvider.state('joinGame.selectDeck', {
    url: '/select-deck',
    templateUrl: 'js/join-game/select-deck.html',
    controller: 'JoinGameSelectDeckController',
  });
}).controller('JoinGameSelectDeckController', ($scope, $state, $http, Socket, user) => {
  if (!user) $scope.notLoggedIn = true;
  $scope.user = user;
  $scope.start = () => {
    let deck = _.find(user.decks, {name: $scope.selectedDeck});
    Socket.emit('join', user, deck);
  };
  Socket.on('waitForPlayer', () => {
    $scope.$apply(() => $scope.waiting = true);
  });
  Socket.on('gameReady', id => $state.go('game', {id: id}));
});
