app.config($stateProvider => {
  $stateProvider.state('play.selectDeck', {
    url: '/:name/select-deck',
    templateUrl: 'js/play/select-deck.html',
    controller: 'PlaySelectDeckController',
    resolve: {
      game: (Game, $stateParams) => Game.findAll({name: $stateParams.name}),
      decks: (Deck, game, user) => Deck.findAll({_id: user.decks, game: game[0]._id})
    }
  });
}).controller('PlaySelectDeckController', ($scope, $state, $http, Socket, user, decks) => {
  if (!user) $scope.notLoggedIn = true;
  $scope.user = user;
  $scope.decks = decks;
  $scope.start = () => {
    let deck = _.find(decks, {name: $scope.selectedDeck});
    Socket.emit('join', user, deck);
  };
  Socket.on('waitForPlayer', () => {
    $scope.$apply(() => $scope.waiting = true);
  });
  Socket.on('gameReady', id => $state.go('game', {id: id}));
});
