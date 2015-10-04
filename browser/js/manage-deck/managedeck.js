app.config(function($stateProvider) {
  $stateProvider.state('managedeck', {
    url: '/managedeck',
    templateUrl: '/js/manage-deck/managedeck.html',
    controller: 'manageDeckController',
    resolve: {
      user: AuthService => AuthService.getLoggedInUser()
    }
  });
});

app.controller('manageDeckController', function($scope, user) {
  $scope.decks = user.decks;
  $scope.selectDeck = () => {
    $scope.cards = _.find(user.decks, {_id: $scope.selectedDeck}).cards;
  };
    // $scope.userCards = user.cards
    // $scope.currentDeck = user.decks

});
