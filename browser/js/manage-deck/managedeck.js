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
  $scope.total = 0;
  $scope.cost = 0;
  // caluclaing cost of total mana
  $scope.labels = ['0', '1', '2', '3', '4', '5', '6','7+'];
  $scope.series;
  $scope.showCards = false;
  $scope.cards = [];
  $scope.decks = user.decks;
  $scope.selectDeck = () => {
    $scope.deck = _.find(user.decks, {_id: $scope.selectedDeck});
    $scope.cards = $scope.deck.cards;
    $scope.total = $scope.cards.length;
    $scope.series = $scope.deck.name;
    $scope.showCards = true;
  };
  
  $scope.calccost = function() {
    $scope.data = [];
    $scope.cards.forEach(function(card) {
      $scope.data.push(card.cost);
    });
    return $scope.data;
  };

 
});
