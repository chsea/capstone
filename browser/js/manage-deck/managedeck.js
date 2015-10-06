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

app.controller('manageDeckController', function($scope, user, $http, $state, DeckFactory, UserFactory) {
  var context;
  var clientsChart;
  $scope.total = 0;
  //$scope.newdeckname ;
  $scope.barData = {};
  $scope.showCards = false;
  $scope.createDeck = false;
  $scope.uniqueCardsInDeck = {};
  $scope.username = user.username;
  $scope.decks = user.decks;
  $scope.usercards = user.cards;
  $scope.selectDeck = () => {
    $scope.deck = _.find(user.decks, {_id: $scope.selectedDeck});
    $scope.deck.cards.forEach(function(card){
      if ($scope.uniqueCardsInDeck.hasOwnProperty(card.name)){
        $scope.uniqueCardsInDeck[card.name] += 1;
      } else {
        $scope.uniqueCardsInDeck[card.name] = 1;
      }
    });

    $scope.deckName = $scope.deck.name;
    $scope.total = $scope.deck.cards.length;
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
    $scope.deck.cards.forEach(function(card) {
      if (card.cost <= 6) {
        $scope.deckCost[card.cost-1]++;
      }
      else {
        $scope.deckCost[6]++;
      }
    });
    return $scope.deckCost;
  };

  $scope.removeFromDeck = function(cardname) {
    if ($scope.total < 1) return;
    var card;
    $scope.deck.cards.forEach(function(currentcard, index) {
      if (currentcard.name === cardname) {
        card = currentcard;
        return;
      }
    });
    $http.put("api/decks/removecard/" + $scope.deck._id, card)
    .then(function(deck) {
    }).then(null, function(err) {
      console.log("error occured", err);
    });
  };

  $scope.removeDeck = function() {
    $http.delete("api/decks/" + $scope.deck._id)
    .then(function(res) {
    }).then(null, function(err) {
      console.log("error occured", err);
    });
  };

  $scope.showCreateDeckForm = function(){
    if ($scope.createDeck){
      $scope.createDeck = false;
    } else {
      $scope.createDeck = true;
    }
  };

  $scope.createNewDeck = function(deckname) {
    DeckFactory.create({"name": deckname})
    .then(function(newdeck){
      $scope.decks.push(newdeck);
      // console.log($scope.decks);
      user.decks = $scope.decks;
      UserFactory.update(user._id, user);
    })
    .then(function(updatedUser){
      console.log("updated user ", updatedUser);
      //console.log("user updated with a new deck");
    })
    .then(null, function(err){
      console.log("error occured ", err);
    });
  };

  $scope.addToDeck = function(card){
    if ($scope.total >= 30) return;
    var url = "api/decks/addcard/" + $scope.deck._id;
    $http.put(url, card)
    .then(function(deck) {
    }).then(null, function(err) {
      console.log("error occured", err);
    });
  };


});
