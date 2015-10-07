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
  $scope.barData = {};
  $scope.showCards = false;
  $scope.createDeck = false;
  $scope.craft = false;
  $scope.uniqueCardsInDeck = {};
  $scope.username = user.username;
  $scope.decks = user.decks;
  $scope.usercards = user.cards;
  $scope.selectDeck = () => {
    if ($scope.selectedDeck === undefined) return;
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
            data: $scope.deckcost()
        }];

  context = document.getElementById('clients').getContext('2d');
  clientsChart = new Chart(context).Bar($scope.barData);
  };
  
  $scope.deckcost = function() {
    $scope.cost = [0,0,0,0,0,0,0];
    $scope.deck.cards.forEach(function(card) {
      if (card.cost <= 6) {
        $scope.cost[card.cost-1]++;
      }
      else {
        $scope.cost[6]++;
      }
    });
    return $scope.cost;
  };

  $scope.removeFromDeck = function(cardname) {
    if ($scope.total < 1 || $scope.deck === undefined) return;
    $scope.deck.cards.forEach(function(currentcard, index) {
      if (currentcard.name === cardname) {
        $scope.deck.cards.splice(index, 1);
        return;
      }
      updateDeck($scope.deck);
    });
  };

  $scope.removeDeck = function() {
    if ($scope.deck === undefined) return;
    DeckFactory.destroy($scope.deck._id)
    .then(function(deletedDeck){
      //console.log("deleted deck", deletedDeck);
    }).then(null, function(err){
      console.log(err);
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
    if (deckname === undefined || deckname.length < 1) return;
    DeckFactory.create({"name": deckname})
    .then(function(newdeck){
      $scope.decks.push(newdeck);
      user.decks = $scope.decks;
      updateUser();
    });
  };

  $scope.addToDeck = function(card){
    if ($scope.deck === undefined || $scope.total > 29) return;
    if (duplicateChecker(card)) {
      console.log("cannot have more than 2 duplicates in the deck");
      return;
    }
    $scope.deck.cards.push(card);
    updateDeck($scope.deck);
  };

  $scope.showCraftForm = function() {
    if ($scope.craft) {
      $scope.craft = false;
    } else {
      $scope.craft = true;
    }
  };

  $scope.disenchant = function(card){
    // 1. Remove card from user.cards
    var cost = card.stardustCost;
    removeCardFromUser(card);
    // 2. Add card's stardust value to user's stardust points
    user.stardust += cost;
    updateUser();
  };

  function updateDeck(deck){
    DeckFactory.update(deck._id, deck)
      .then(function(updatedDeck){
        //console.log("deck updated");
      })
      .then(null, function(err){
        console.log("Error occured ", err);
      });
  }

  function updateUser(){
    UserFactory.update(user._id, user)
      .then(function(updatedUser){
        // console.log("user updated");
        return true;
      })
      .then(null, function(err){
        console.log("Error occured ", err);
        return false;
      });
  }

  function duplicateChecker(card) {
    var count = 0;
    $scope.deck.cards.forEach(function(currentcard){
      if (currentcard._id === card._id){
        count++;
      }
    });
    if (count >= 2) return true;
    return false;
  }

  function removeCardFromUser(card) {
    // remove the card from the user's user.cards property
    var indx = -1;
    user.cards.forEach(function(currentcard, index){
      if (currentcard._id === card._id){
        indx = index;
      }
    });
    user.cards.splice(indx, 1);
  }

});








