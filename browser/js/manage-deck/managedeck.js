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
  var context;
  var clientsChart;
  $scope.total = 0;
  $scope.barData = {};
  $scope.showCards = false;
  $scope.cards = [];
  $scope.decks = user.decks;
  $scope.selectDeck = () => {
    $scope.deck = _.find(user.decks, {_id: $scope.selectedDeck});
    $scope.cards = $scope.deck.cards;
    $scope.total = $scope.cards.length;
    $scope.deckName = $scope.deck.name;
    $scope.showCards = true;
    $scope.barData.labels = ["1", "2", "3", "4", "5", "6","7+"];
    $scope.barData.datasets = [{
            label: $scope.deckName,
            fillColor: "rgba(220,220,220,0.5)",
            strokeColor: "rgba(220,220,220,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: $scope.calccost()
        }];

  context = document.getElementById('clients').getContext('2d');
  clientsChart = new Chart(context).Bar($scope.barData);

  };
  
  $scope.calccost = function() {
    $scope.deckCost = [0,0,0,0,0,0,0];
    $scope.cards.forEach(function(card) {
      if (card.cost <= 6) {
        $scope.deckCost[card.cost-1]++;
      }
      else {
        $scope.deckCost[6]++;
      }
    });
    return $scope.deckCost;
  };

  $scope.removeCard = function(card) {

  };


});
